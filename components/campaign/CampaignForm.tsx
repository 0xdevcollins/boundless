import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Plus } from 'lucide-react';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import format from 'date-fns/format';
import { cn } from '@/lib/utils';

const InputClass =
  'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm';

const CampaignForm = () => {
  const [fundingGoal, setFundingGoal] = useState('');
  const [deadline, setDeadline] = useState<Date | undefined>(undefined);
  const [milestones, setMilestones] = useState([{ title: '', description: '' }]);
  const [errors, setErrors] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid =
    fundingGoal.length > 2 && deadline && milestones.every((milestone) => Boolean(milestone.title)) && !isLoading;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!fundingGoal || fundingGoal.length < 2) {
      toast.error('Funding goal too short');
      setIsLoading(false);
      return;
    }

    for (let i = 0; i < milestones.length; i++) {
      if (milestones[i].title.length < 2) {
        toast.error(`Milestone ${i + 1} title too short`);
        setIsLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/campaigns`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fundingGoal,
          deadline: deadline?.toISOString(),
          milestones,
        }),
      });

      if (response.ok) {
        toast.success('Campaign created');
        setIsLoading(false);
        setFundingGoal('');
        setDeadline(undefined);
        setMilestones([{ title: '', description: '' }]);
        setErrors(['']);
      } else {
        const data = await response.json();
        toast.error(data.message || 'An error occurred. Please try again');
      }
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(`An error occurred: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addMilestoneInputs = (e: React.MouseEvent) => {
    e.preventDefault();

    const isTitled = milestones.every((milestone) => Boolean(milestone.title));

    if (!isTitled) {
      milestones.map((milestone, index) => {
        console.log({ milestone: !milestone.title });
        if (!milestone.title) {
          const updatedErrors = [...errors];
          updatedErrors[index] = 'Title required';
          return setErrors(updatedErrors);
        }
      });
    } else {
      setMilestones([...milestones, { title: '', description: '' }]);
      setErrors([...errors, '']);
    }

    console.log({ errors, isTitled });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-6 max-w-4xl mx-auto max-h-[90%]">
      <div>
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 border border-primary/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-users h-4 w-4 mr-2"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="text-sm font-medium">📌 Goals • Milestones • Deadline</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Plan your campaign with clear goals and milestones</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto mb-6"></div>
        </div>
      </div>
      <div className="my-4">
        <Input
          id="funding-goal"
          name="funding goal"
          type="text"
          placeholder="Enter funding goal"
          className={InputClass}
          value={fundingGoal}
          onChange={(e) => setFundingGoal(e.target.value)}
        />
      </div>
      <div className="my-4 ">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn(InputClass, 'justify-start text-left font-normal')}>
              {deadline ? format(deadline, 'PPP') : 'Select deadline'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={deadline}
              onSelect={setDeadline}
              disabled={(date) => date < new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Milestones</h3>
        <div className="overflow-y-scroll max-h-[250px] sm:max-h-[300px] pb-6 pr-4">
          {' '}
          {milestones.map((milestone, index) => (
            <div key={index} className="grid gap-2 ">
              <div className="flex gap-4 flex-col sm:flex-row">
                <h6 className="self-center font-bold">{index + 1}.</h6>
                <Input
                  placeholder="Title"
                  value={milestone.title}
                  className={InputClass}
                  onChange={(e) => {
                    setMilestones((prev) => {
                      const updated = [...prev];
                      updated[index] = { ...updated[index], title: e.target.value };
                      return updated;
                    });

                    setErrors((prev) => {
                      const updatedErrors = [...prev];
                      updatedErrors[index] = '';
                      return updatedErrors;
                    });
                  }}
                />
                <Textarea
                  draggable={false}
                  placeholder="Description"
                  value={milestone.description}
                  className={InputClass}
                  onChange={(e) =>
                    setMilestones((prev) => {
                      const updated = [...prev];
                      updated[index] = { ...updated[index], description: e.target.value };
                      return updated;
                    })
                  }
                />
              </div>
              {errors[index] && <p className="text-sm text-red-500 pb-2">{errors[index]}</p>}
              <hr className="sm:my-3 my-6" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full my-3 justify-end items-centerte">
        {' '}
        <Button type="button" className="" onClick={addMilestoneInputs} disabled={isLoading}>
          <Plus />
        </Button>
      </div>

      <Button
        disabled={!isFormValid}
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/85 focus:outline-none"
      >
        {isLoading ? 'Creating campaign...' : 'Create campaign'}
      </Button>
    </form>
  );
};

export default CampaignForm;
