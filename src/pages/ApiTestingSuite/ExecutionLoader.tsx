import { LinearProgress } from '@mui/material'
import React from 'react'

const ExecutionLoader = () => {

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div id="execution-loader" className="loader-container min-h-screen flex flex-col justify-center items-center relative">
      <style>{`
        @keyframes scaleFade {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
      `}</style>
      {/* <!-- Background decorative elements --> */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-[#3B82F6]/10 rounded-full blur-xl floating-dots"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-[#8B5CF6]/10 rounded-full blur-lg floating-dots"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-[#3B82F6]/5 rounded-full blur-2xl floating-dots"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-[#8B5CF6]/10 rounded-full blur-xl floating-dots"></div>
      </div>

      {/* <!-- Main loader content --> */}
      <div className="text-center z-10 max-w-2xl mx-auto px-8">

        {/* <!-- Logo --> */}
        <div className="mb-12">
          <div className="logo-pulse mb-8">
            <img
              // className="h-24 w-auto mx-auto scale-125 transform"
              className="h-24 w-auto mx-auto "

              style={{
                animation: 'scaleFade 3s ease-in-out infinite',
                transformOrigin: 'center',
              }}
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/9b7d96063c-ea5136f19585b669bf04.png" alt="AutoQAi logo"
            />
          </div>
        </div>

        {/* <!-- Main message --> */}
        <div className="mb-8">
          <h1
            // className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] bg-clip-text text-transparent"
          >
            Execution underway…
          </h1>
          <p className="text-xl md:text-2xl text-[#FFFFFF]/80 text-glow">
            Relax, we've got this!
          </p>
        </div>

        {/* <!-- Progress indicator --> */}
        {/* <div className="mb-12">
          <div className="w-full bg-[#1A1A2E] rounded-full h-3 mb-4 border border-[#374151]">
            <div className="progress-bar bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] h-full rounded-full"></div>
          </div>
          <p className="text-sm text-gray-400">Processing your test execution...</p>
        </div> */}
        <div className="mb-12">
          <div className="mb-4 h-3">
            <LinearProgress variant="determinate" value={progress}
              sx={{
                height: '100%',
                borderRadius: 5,
                backgroundColor: '#1A1A2E',
                  borderColor:'#374151',
                
                // border:'2px',
                // border:0.1,
                // padding:'1px',
                '& .MuiLinearProgress-bar': {
                  // backgroundColor: '#8B5CF6', // your custom color
                  // backgroundImage: 'linear-gradient(to right, #3B82F6, #8B5CF6)',
                  background: 'linear-gradient(to right, #3B82F6, #8B5CF6)',

                },
              }}
            />
          </div>

          <p className="text-sm text-gray-400">Processing your test execution...</p>
        </div>
        {/* <!-- Additional info --> */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">
            <i className="fa-solid fa-info-circle mr-2"></i>
            This may take a few moments depending on your test complexity
          </p>
          <p className="text-xs text-gray-600">
            You'll be automatically redirected when execution completes
          </p>
        </div>

      </div>

      {/* <!-- Bottom branding --> */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-3 text-gray-500">
          <span className="text-sm">Powered by</span>
          <span className="text-lg font-bold text-[#3B82F6]">AutoQAi</span>
        </div>
      </div>

    </div>
  )
}

export default ExecutionLoader
