"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ChatInterface from './ChatInterface';
import ArtifactPreview from './ArtifactPreview';
import Groq from "groq-sdk";
import { generateUI, getVersions, rollback } from '@/lib/api';

export interface Message {
    role: 'user' | 'model';
    text: string;
    artifact?: {
        title: string;
        type: string;
        content: string;
    };
}

const Dashboard: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [artifactOpen, setArtifactOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentArtifact, setCurrentArtifact] = useState<{ title: string; type: string; content: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [ast, setAst] = useState<any | null>(null)
    const [explanation, setExplanation] = useState("")
    const [loading, setLoading] = useState(false)
    const [versions, setVersions] = useState<any[]>([])

    // Initialize Groq client
    const groq = new Groq({
        apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    const startNewChat = () => {
        setMessages([]);
        setArtifactOpen(false);
        setCurrentArtifact(null);
        setIsLoading(false);
    };

    async function handleGenerate(message: string) {
        setLoading(true)

        try {
            const data = await generateUI(message)

            setAst(data.ast)
            setExplanation(data.explanation)

            const versionList = await getVersions()
            setVersions(versionList)

        } catch (err) {
            console.error(err)
        }

        setLoading(false)
    }


    const handleSendMessage = async (text: string) => {
        if (!text.trim()) return;

        // 1. Add User Message
        const newUserMsg: Message = { role: 'user', text };
        setMessages(prev => [...prev, newUserMsg]);
        setIsLoading(true);

        // 2. Detect intent: UI generation vs. regular conversation
        const uiKeywords = /\b(build|generate|create|design|make|layout|component|page|form|table|modal|sidebar|navbar|dashboard|card|button|input|chart|ui|schema|add|remove|modify|update|change)\b/i;
        const isUIRequest = uiKeywords.test(text);

        if (isUIRequest) {
            // Route to deterministic UI generator backend
            try {
                const data = await generateUI(text);
                setAst(data.ast);
                setExplanation(data.explanation);

                const versionList = await getVersions();
                setVersions(versionList);

                const modelMsg: Message = {
                    role: 'model',
                    text: data.explanation || "I've generated the UI for you.",
                    artifact: data.ast ? {
                        title: 'Generated UI',
                        type: 'html',
                        content: JSON.stringify(data.ast, null, 2)
                    } : undefined
                };
                setMessages(prev => [...prev, modelMsg]);

                if (data.ast) {
                    setCurrentArtifact({
                        title: 'Generated UI',
                        type: 'html',
                        content: JSON.stringify(data.ast, null, 2)
                    });
                    setArtifactOpen(true);
                }
            } catch (err) {
                console.error(err);
                setMessages(prev => [...prev, { role: 'model', text: "Sorry, the UI generation failed. Please try again." }]);
            } finally {
                setIsLoading(false);
            }
            return;
        }

        // 3. Regular conversation — call Groq API

        try {
            // 2. Call Groq API
            const chatCompletion = await groq.chat.completions.create({
                model: "openai/gpt-oss-120b",
                messages: [
                    {
                        role: "system",
                        content: `You are Claude, an expert UI engineer and helper. 
Respond to the user's request. 

CRITICAL INSTRUCTION FOR ARTIFACTS:
If the user asks to generate a UI, a roadmap, code, or a structured document, you MUST generate an "Artifact".
To do this, wrap the artifact content in a special block format:

:::artifact{title="The Title" type="html"}
... HTML content with Tailwind CSS classes ...
:::

If it is a roadmap or UI, use semantic HTML with Tailwind CSS classes. 
For the Roadmap specifically, try to match this style if relevant: dark mode, gradients, timeline dots.
Keep the main response conversational and brief, pointing to the artifact.`
                    },
                    {
                        role: "user",
                        content: text
                    }
                ],
            });

            const rawText = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

            // 3. Parse for Artifacts
            // Regex to find :::artifact{...} ... ::: content
            const artifactRegex = /:::artifact{title="([^"]*)"\s*type="([^"]*)"}\s*([\s\S]*?):::/;
            const match = rawText.match(artifactRegex);

            let modelText = rawText;
            let generatedArtifact = null;

            if (match) {
                // Extract artifact data
                const [fullMatch, title, type, content] = match;
                generatedArtifact = { title, type, content: content.trim() };

                // Remove the artifact block from the main chat text to keep it clean
                modelText = rawText.replace(fullMatch, '').trim();

                // Set current artifact and open sidebar
                setCurrentArtifact(generatedArtifact);
                setArtifactOpen(true);
            }

            // 4. Add Model Message
            const newModelMsg: Message = {
                role: 'model',
                text: modelText,
                artifact: generatedArtifact || undefined
            };

            setMessages(prev => [...prev, newModelMsg]);

        } catch (error) {
            console.error("Error generating content:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I encountered an error connecting to the AI model. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenArtifact = (artifact: { title: string; type: string; content: string }) => {
        setCurrentArtifact(artifact);
        setArtifactOpen(true);
    };

    const handleRollback = async (versionId: string) => {
        try {
            const data = await rollback(versionId);
            setAst(data.ast);
            setExplanation(data.explanation);
            setMessages(prev => [...prev, { role: 'model', text: `Rolled back to version ${versionId.slice(0, 8)}.` }]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex h-screen w-full bg-[#2B2B2B] text-[#EDEDED] overflow-hidden font-sans">
            <Sidebar
                isOpen={sidebarOpen}
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                onNewChat={startNewChat}
            />
            <div className="flex-1 flex relative overflow-hidden">
                <ChatInterface
                    sidebarOpen={sidebarOpen}
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    isArtifactOpen={artifactOpen}
                    messages={messages}
                    isLoading={isLoading}
                    onSendMessage={handleSendMessage}
                    onOpenArtifact={handleOpenArtifact}
                    onNewChat={startNewChat}
                />
                <ArtifactPreview
                    isOpen={artifactOpen}
                    onClose={() => setArtifactOpen(false)}
                    artifact={currentArtifact}
                    ast={ast}
                    versions={versions}
                    onRollback={handleRollback}
                    onAstUpdate={(newAst) => setAst(newAst)}
                />
            </div>
        </div>
    );
};

export default Dashboard;