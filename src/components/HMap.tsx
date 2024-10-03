'use client';

import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HeatMapComponent = () => {
  const [phraseData, setPhraseData] = useState<
    { date: string; count: number }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPhraseCounts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/phrases/count');
        if (!response.ok) {
          throw new Error('Failed to fetch phrase counts');
        }
        const data = await response.json();
        const formattedData = data.map(
          (item: { date: string; count: number }) => ({
            date: new Date(item.date).toISOString().split('T')[0],
            count: item.count,
          })
        );
        setPhraseData(formattedData);
      } catch (error) {
        toast.error('Error fetching phrase counts.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhraseCounts();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getActivityLevel = (count: number) => {
    if (count === 0) return 'No activity';
    if (count <= 1) return 'Low activity';
    if (count <= 20) return 'Moderate activity';
    if (count <= 30) return 'High activity';
    return 'Very high activity';
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Phrase Activity Heatmap
        </h2>
        {isLoading ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="animate-spin text-purple-600 h-8 w-8" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <HeatMap
              value={phraseData}
              width={800}
              height={200}
              startDate={new Date(new Date().getFullYear(), 0, 1)}
              weekLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
              monthLabels={[
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ]}
              panelColors={{
                0: '#ebedf0',
                1: '#9be9a8',
                4: '#40c463',
                8: '#30a14e',
                16: '#216e39',
              }}
              rectProps={{
                rx: 3, // Rounded corners
              }}
              rectRender={(props, data) => {
                return (
                  <Tooltip
                    placement="bottom"
                    overlayInnerStyle={{
                      backgroundColor: '#333',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                    content={
                      <div>
                        <div className="font-semibold">
                          {formatDate(data.date)}
                        </div>
                        <div className="text-sm">{data.count || 0} phrases</div>
                        <div className="text-xs text-gray-300">
                          {getActivityLevel(data.count || 0)}
                        </div>
                      </div>
                    }
                  >
                    <rect
                      {...props}
                      className="transition-all duration-200 hover:stroke-2 hover:stroke-gray-400"
                    />
                  </Tooltip>
                );
              }}
            />
          </div>
        )}
        <div className="mt-6 flex justify-center items-center gap-4">
          <div className="text-sm text-gray-600">Activity Level:</div>
          {[
            { color: '#ebedf0', label: 'None' },
            { color: '#9be9a8', label: 'Low' },
            { color: '#40c463', label: 'Moderate' },
            { color: '#30a14e', label: 'High' },
            { color: '#216e39', label: 'Very High' },
          ].map((level, index) => (
            <div key={index} className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: level.color }}
              />
              <span className="text-xs text-gray-600">{level.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeatMapComponent;
