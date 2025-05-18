import React, { useMemo } from 'react';
import useRequest from './hooks/useRequest';
import apis from './apis';

function App() {
  const { data, status, execute } = useRequest(apis.v1.ping);

  const statusClassnames = useMemo(() => {
    switch (status) {
      case 'idle':
        return 'text-gray-500 dark:text-gray-400';
      case 'loading':
        return 'text-blue-500 dark:text-blue-400';
      case 'success':
        return 'text-green-500 dark:text-green-400';
      case 'error':
        return 'text-red-500 dark:text-red-400';
      default:
        return '';
    }
  }, [status]);

  return (
    <div className='w-full h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4'>
      <div className='max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden p-6'>
        <div className='flex justify-center mb-6'>
          <button
            onClick={() => execute()}
            className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center'
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-2' viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z'
                clipRule='evenodd'
              />
            </svg>
            Ping
          </button>
        </div>

        <div className='space-y-4'>
          <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-3'>
            <div className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>Status</div>
            <div className={`font-mono text-sm ${statusClassnames}`}>{status}</div>
          </div>

          <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-3'>
            <div className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-1'>Response Data</div>
            <pre className='font-mono text-sm whitespace-pre-wrap break-words text-gray-700 dark:text-gray-300 overflow-auto max-h-60'>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
