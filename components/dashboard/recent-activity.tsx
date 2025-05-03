export default function RecentActivity() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="rounded-full w-2 h-2 bg-green-500" />
        <div className="space-y-1">
          <p className="text-sm font-medium">Milestone approved</p>
          <p className="text-xs text-muted-foreground">2 hours ago</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="rounded-full w-2 h-2 bg-blue-500" />
        <div className="space-y-1">
          <p className="text-sm font-medium">New contribution</p>
          <p className="text-xs text-muted-foreground">5 hours ago</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="rounded-full w-2 h-2 bg-yellow-500" />
        <div className="space-y-1">
          <p className="text-sm font-medium">Project update</p>
          <p className="text-xs text-muted-foreground">Yesterday</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="rounded-full w-2 h-2 bg-purple-500" />
        <div className="space-y-1">
          <p className="text-sm font-medium">Voted on proposal</p>
          <p className="text-xs text-muted-foreground">2 days ago</p>
        </div>
      </div>
    </div>
  );
}
