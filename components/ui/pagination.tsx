import React from 'react';
import { BoundlessButton } from '../buttons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`mt-6 w-full border-t border-[#2B2B2B] pt-4 ${className}`}>
      <div className='flex items-center justify-between'>
        <span className='text-sm text-gray-400'>
          Page {currentPage} of {totalPages}
        </span>

        <div className='flex gap-2'>
          <BoundlessButton
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            size='sm'
            variant='outline'
            className=''
          >
            Previous
          </BoundlessButton>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
            if (
              page === 1 ||
              page === totalPages ||
              Math.abs(page - currentPage) <= 1
            ) {
              return (
                <BoundlessButton
                  key={page}
                  onClick={() => onPageChange(page)}
                  size='sm'
                  variant={currentPage === page ? 'default' : 'outline'}
                  className={
                    currentPage === page
                      ? 'bg-blue-600'
                      : 'border-[#2B2B2B] text-white hover:bg-[#2B2B2B]'
                  }
                >
                  {page}
                </BoundlessButton>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return (
                <span key={page} className='px-2 text-gray-500'>
                  ...
                </span>
              );
            }
            return null;
          })}

          <BoundlessButton
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            size='sm'
            variant='outline'
            className='border-[#2B2B2B] text-white'
          >
            Next
          </BoundlessButton>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
