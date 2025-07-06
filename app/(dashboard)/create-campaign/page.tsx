import { CampaignForm } from '@/components/campaign-form';
import React from 'react';

const page = () => {
  return (
    <div>
      <div className="container max-w-3sxl py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create New Campaign</h1>
          <p className="text-muted-foreground">Plan your campaign with clear goals and milestones</p>
        </div>
        <CampaignForm />
      </div>
    </div>
  );
};

export default page;
