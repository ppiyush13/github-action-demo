
export const handleGlobalException = ex => {
    console.error('Global exception');
    console.error(err);
    process.exit(1);
};

process.on('uncaughtException', handleGlobalException);
process.on('unhandledRejection', handleGlobalException);
