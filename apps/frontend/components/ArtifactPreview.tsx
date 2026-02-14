"use client";
import React, { useState } from 'react';
import { X, Copy, RefreshCw, ChevronDown, Eye, History, Code } from 'lucide-react';
import { Renderer } from './Renderer';
import CodeEditor from './CodeEditor';
import { PreviewWrapper } from './PreviewWrapper';

interface ArtifactPreviewProps {
    isOpen: boolean;
    onClose: () => void;
    artifact: { title: string; type: string; content: string } | null;
    ast?: any;
    versions?: any[];
    onRollback?: (versionId: string) => void;
    onAstUpdate?: (ast: any) => void;
}

const ArtifactPreview: React.FC<ArtifactPreviewProps> = ({ isOpen, onClose, artifact, ast, versions = [], onRollback, onAstUpdate }) => {
    const [showVersions, setShowVersions] = useState(false);
    const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');

    return (
        <div
            className={`
                border-l border-[#262626] bg-[#0C0C0C] flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                ${isOpen ? 'w-[45%] min-w-[400px] opacity-100 translate-x-0' : 'w-0 min-w-0 opacity-0 translate-x-20 overflow-hidden'}
            `}
        >
            {/* Header */}
            <div className="h-12 min-h-[48px] border-b border-[#262626] flex items-center justify-between px-4 bg-[#141414]">
                <div className="flex items-center gap-3 text-sm text-[#9CA3AF]">
                    <div className="flex items-center gap-2">
                        <div className="bg-[#262626] p-1 rounded text-[#ECECEC]">
                            {viewMode === 'preview' ? <Eye className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-[#ECECEC] font-medium whitespace-nowrap truncate max-w-[200px]">
                            {artifact?.title || 'Artifact'}
                        </span>
                        <span className="text-[#444]">·</span>
                        <span className="text-[#9CA3AF] uppercase text-xs">{artifact?.type || 'HTML'}</span>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {/* Preview / Code Toggle */}
                    <div className="flex items-center bg-[#1A1A1A] rounded-md border border-[#262626] p-0.5">
                        <button
                            onClick={() => setViewMode('preview')}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors ${viewMode === 'preview'
                                ? 'bg-[#262626] text-[#ECECEC]'
                                : 'text-[#737373] hover:text-[#9CA3AF]'
                                }`}
                        >
                            <Eye className="w-3 h-3" />
                            Preview
                        </button>
                        <button
                            onClick={() => setViewMode('code')}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-colors ${viewMode === 'code'
                                ? 'bg-[#262626] text-[#ECECEC]'
                                : 'text-[#737373] hover:text-[#9CA3AF]'
                                }`}
                        >
                            <Code className="w-3 h-3" />
                            Code
                        </button>
                    </div>

                    <button className="h-7 flex items-center gap-1.5 px-2 hover:bg-[#262626] rounded text-[#9CA3AF] hover:text-[#ECECEC] text-xs font-medium transition-colors">
                        <Copy className="w-3.5 h-3.5" /> Copy <ChevronDown className="w-3 h-3" />
                    </button>
                    <div className="relative">
                        <button
                            onClick={() => setShowVersions(!showVersions)}
                            className={`w-7 h-7 flex items-center justify-center rounded transition-colors ${showVersions ? 'bg-[#262626] text-[#ECECEC]' : 'text-[#9CA3AF] hover:bg-[#262626] hover:text-[#ECECEC]'}`}
                            title="Version history"
                        >
                            <RefreshCw className="w-3.5 h-3.5" />
                        </button>

                        {/* Version Dropdown */}
                        {showVersions && versions.length > 0 && (
                            <div className="absolute right-0 top-9 z-50 w-48 bg-[#1A1A1A] border border-[#333] rounded-lg shadow-xl overflow-hidden">
                                <div className="px-3 py-2 border-b border-[#262626] flex items-center gap-2">
                                    <History className="w-3.5 h-3.5 text-[#9CA3AF]" />
                                    <span className="text-xs font-medium text-[#9CA3AF]">Versions</span>
                                </div>
                                <div className="max-h-48 overflow-y-auto custom-scrollbar">
                                    {([...versions].reverse()).map((v: any, i: number) => (
                                        <button
                                            key={v.id}
                                            onClick={async () => {
                                                onRollback?.(v.id);
                                                setShowVersions(false);
                                            }}
                                            className="w-full text-left px-3 py-2 text-sm text-[#ECECEC] hover:bg-[#262626] transition-colors flex items-center justify-between"
                                        >
                                            <span className="font-mono text-xs">{v.id.slice(0, 8)}</span>
                                            <span className="text-[10px] text-[#737373]">v{versions.length - i}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <button onClick={onClose} className="w-7 h-7 flex items-center justify-center hover:bg-[#262626] rounded text-[#9CA3AF] hover:text-[#ECECEC] transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            {viewMode === 'preview' ? (
                <div className="flex-1 overflow-y-auto p-8 font-sans bg-[#09090b]" onClick={() => showVersions && setShowVersions(false)}>
                    {ast ? (
                        <div className="max-w-2xl mx-auto">
                            <PreviewWrapper>
                                <Renderer node={ast} />
                            </PreviewWrapper>
                        </div>
                    ) : artifact?.content ? (
                        <div
                            className="max-w-2xl mx-auto prose prose-invert prose-p:text-gray-400 prose-headings:text-gray-100"
                            dangerouslySetInnerHTML={{ __html: artifact.content }}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-[#333]">
                            No content available
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex-1 overflow-hidden bg-[#1e1e1e]">
                    <CodeEditor
                        ast={ast}
                        onValidAst={(validatedAst) => {
                            onAstUpdate?.(validatedAst);
                            setViewMode('preview');
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default ArtifactPreview;