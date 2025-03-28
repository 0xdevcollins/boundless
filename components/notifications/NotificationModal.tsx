"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
}

interface NotificationModalProps {
  notification: Notification | null;
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationModal({
  notification,
  isOpen,
  onClose,
}: NotificationModalProps) {
  if (!notification) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{notification.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="text-sm text-muted-foreground">
            {new Date(notification.timestamp).toLocaleString()}
          </div>
          <div className="text-sm">{notification.description}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
