import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingStateProps {
  type: 'stats' | 'cards' | 'table' | 'comments';
  count?: number;
}

export function LoadingState({ type, count = 4 }: LoadingStateProps) {
  if (type === 'stats') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={crypto.randomUUID()} className={_ && i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-4 w-24 mt-1" />
              </CardHeader>
              <CardContent>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }

  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <Card key={crypto.randomUUID()} className="overflow-hidden" id={_ + i}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-20 mt-2" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="w-full flex justify-between">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="rounded-md border mb-8 overflow-hidden">
        <div className="p-4">
          <div className="h-10 bg-muted rounded-md mb-4" />
          {Array(count)
            .fill(0)
            .map((_, i) => (
              <div key={crypto.randomUUID()} className="flex gap-4 py-3 items-center" id={_ + i}>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-8 w-16 ml-auto" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (type === 'comments') {
    return (
      <div className="space-y-4 mb-8">
        {Array(count)
          .fill(0)
          .map(() => (
            <Card key={crypto.randomUUID()}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-24 mt-1" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-6" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-6" />
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    );
  }

  return null;
}
