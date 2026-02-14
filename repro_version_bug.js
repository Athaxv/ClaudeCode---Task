const versions = [
    { id: 'uuid-1', timestamp: 100 }, // v1 (Oldest)
    { id: 'uuid-2', timestamp: 200 }, // v2
    { id: 'uuid-3', timestamp: 300 }  // v3 (Newest)
];

console.log("Current Rendering (Oldest -> Newest):");
versions.forEach((v, i) => {
    const label = `v${versions.length - i}`;
    console.log(`Index ${i} (${v.id}): Label ${label}`);
});

console.log("\nProposed Rendering (Newest -> Oldest):");
const reversedVersions = [...versions].reverse();
reversedVersions.forEach((v, i) => {
    const label = `v${versions.length - i}`;
    console.log(`Index ${i} (${v.id}): Label ${label}`);
});
