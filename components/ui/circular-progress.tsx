import React from 'react';

interface CircularProgressProps {
  /** Current progress value */
  value: number;
  /** Maximum value for progress calculation */
  maxValue?: number;
  /** Size of the circular progress in pixels */
  size?: number;
  /** Width of the progress stroke */
  strokeWidth?: number;
  /** Number of segments to divide the circle into */
  segments?: number;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show the value in the center */
  showValue?: boolean;
  /** Custom CSS classes for the value text */
  valueClassName?: string;
  /** Primary color for filled segments */
  primaryColor?: string;
  /** Background color for empty segments */
  backgroundColor?: string;
  /** Animation duration in milliseconds */
  animationDuration?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  maxValue = 14,
  size = 32,
  strokeWidth = 6,
  segments = 14,
  className = '',
  showValue = true,
  valueClassName = '',
  primaryColor = '#3B82F6',
  backgroundColor = '#E5E7EB',
  animationDuration = 300,
}) => {
  // Validation and calculations
  const normalizedValue = Math.min(Math.max(value, 0), maxValue);
  const progress = normalizedValue / maxValue;
  const filledSegments = Math.round(segments * progress);

  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  // Segment calculations
  const segmentAngle = (2 * Math.PI) / segments;
  const gapAngle = segmentAngle * 0.1; // 10% gap between segments
  const actualSegmentAngle = segmentAngle - gapAngle;

  const createSegmentPath = (index: number): string => {
    const startAngle = index * segmentAngle - Math.PI / 2; // Start from top
    const endAngle = startAngle + actualSegmentAngle;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const largeArcFlag = actualSegmentAngle > Math.PI ? 1 : 0;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  const getSegmentColor = (index: number): string => {
    return index < filledSegments ? primaryColor : backgroundColor;
  };

  const getSegmentOpacity = (index: number): number => {
    if (index < filledSegments) return 1;
    if (index === filledSegments && progress % (1 / segments) > 0) {
      // Partial fill for the current segment
      return (progress * segments) % 1;
    }
    return 0.3;
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className='overflow-visible'
        style={{
          filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))',
        }}
      >
        {/* Background circle for reference */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill='none'
          stroke='#F3F4F6'
          strokeWidth={strokeWidth / 4}
          opacity={0.5}
        />

        {/* Progress segments */}
        {Array.from({ length: segments }, (_, index) => (
          <path
            key={`segment-${index}`}
            d={createSegmentPath(index)}
            fill='none'
            stroke={getSegmentColor(index)}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            opacity={getSegmentOpacity(index)}
            style={{
              transition: `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
              transformOrigin: `${center}px ${center}px`,
            }}
          />
        ))}
      </svg>

      {/* Center value */}
      {showValue && (
        <div
          className='pointer-events-none absolute inset-0 flex items-center justify-center'
          style={{
            width: size,
            height: size,
          }}
        >
          <span
            className={`leading-none font-bold text-gray-300 select-none ${valueClassName}`}
            style={{
              fontSize: Math.max(size * 0.25, 12),
              lineHeight: 1,
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            {normalizedValue}
          </span>
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
