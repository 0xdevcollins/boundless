'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Copy,
  ExternalLink,
  MessageCircle,
  Twitter,
  MessageSquare,
  Send,
} from 'lucide-react';
import { toast } from 'sonner';

interface ShareCampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaignLink: string;
  campaignTitle: string;
}

const ShareCampaignModal: React.FC<ShareCampaignModalProps> = ({
  open,
  onOpenChange,
  campaignLink,
  campaignTitle,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(campaignLink);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const shareToTwitter = () => {
    const text = `Check out this amazing campaign: ${campaignTitle}`;
    const url = encodeURIComponent(campaignLink);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
    window.open(twitterUrl, '_blank');
  };

  const shareToDiscord = () => {
    const text = `Check out this amazing campaign: ${campaignTitle}\n${campaignLink}`;
    const discordUrl = `https://discord.com/channels/@me?content=${encodeURIComponent(text)}`;
    window.open(discordUrl, '_blank');
  };

  const shareToWhatsApp = () => {
    const text = `Check out this amazing campaign: ${campaignTitle}\n${campaignLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareToTelegram = () => {
    const text = `Check out this amazing campaign: ${campaignTitle}\n${campaignLink}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(campaignLink)}&text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, '_blank');
  };

  const shareOptions = [
    {
      name: 'Discord',
      icon: MessageCircle,
      color: 'bg-[#5865F2] hover:bg-[#4752C4]',
      onClick: shareToDiscord,
    },
    {
      name: 'X/Twitter',
      icon: Twitter,
      color: 'bg-[#1DA1F2] hover:bg-[#1A91DA]',
      onClick: shareToTwitter,
    },
    {
      name: 'WhatsApp',
      icon: MessageSquare,
      color: 'bg-[#25D366] hover:bg-[#22C55E]',
      onClick: shareToWhatsApp,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-[#0088CC] hover:bg-[#0077B3]',
      onClick: shareToTelegram,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='bg-[#1A1A1A] border-[#2B2B2B] text-white max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-[#F5F5F5] text-xl font-semibold'>
            Share Campaign
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          <div className='space-y-3'>
            <label className='text-[#B5B5B5] text-sm font-medium'>
              Campaign Link
            </label>
            <div className='flex items-center space-x-2'>
              <Input
                value={campaignLink}
                readOnly
                className='flex-1 bg-[#2A2A2A] border-[#2B2B2B] text-[#F5F5F5] placeholder:text-[#B5B5B5]'
                placeholder='Campaign link will appear here...'
              />
              <Button
                variant='outline'
                size='sm'
                onClick={copyToClipboard}
                className='border-[#2B2B2B] bg-[#2A2A2A] text-[#F5F5F5] hover:bg-[#1A1A1A] min-w-[40px]'
              >
                <Copy className='w-4 h-4' />
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => window.open(campaignLink, '_blank')}
                className='border-[#2B2B2B] bg-[#2A2A2A] text-[#F5F5F5] hover:bg-[#1A1A1A] min-w-[40px]'
              >
                <ExternalLink className='w-4 h-4' />
              </Button>
            </div>
            {copied && (
              <p className='text-green-500 text-xs'>
                Link copied to clipboard!
              </p>
            )}
          </div>

          <div className='space-y-3'>
            <label className='text-[#B5B5B5] text-sm font-medium'>
              Share on Social Media
            </label>
            <div className='grid grid-cols-2 gap-3'>
              {shareOptions.map(option => (
                <Button
                  key={option.name}
                  onClick={option.onClick}
                  className={`${option.color} text-white border-0 hover:scale-105 transition-transform`}
                >
                  <option.icon className='w-4 h-4 mr-2' />
                  {option.name}
                </Button>
              ))}
            </div>
          </div>

          <div className='bg-[#2A2A2A] rounded-lg p-4 border border-[#2B2B2B]'>
            <h4 className='text-[#F5F5F5] font-medium mb-2'>Preview</h4>
            <div className='space-y-2'>
              <p className='text-[#F5F5F5] font-medium text-sm'>
                {campaignTitle}
              </p>
              <p className='text-[#B5B5B5] text-xs'>
                Check out this amazing campaign on Boundless!
              </p>
              <p className='text-[#B5B5B5] text-xs truncate'>{campaignLink}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareCampaignModal;
