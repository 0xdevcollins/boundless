"use client";

import { Card, CardContent } from "@/components/ui/card";
import { StepButton } from "./step-button";
import { StepContent } from "./step-content";

interface Step {
	id: string;
	title: string;
	description?: string;
}

interface StepNavigationProps {
	steps: Step[];
	currentStep: number;
	getStepCompletion: (step: number) => boolean;
	onNavigate: (step: number) => void;
}

export function StepNavigation({
	steps,
	currentStep,
	getStepCompletion,
	onNavigate,
}: StepNavigationProps) {
	const isStepNavigable = (stepNumber: number) => {
		if (stepNumber <= currentStep) return true;
		if (stepNumber === currentStep + 1 && getStepCompletion(currentStep))
			return true;
		if (stepNumber > currentStep + 1) {
			for (let i = 1; i < stepNumber; i++) {
				if (!getStepCompletion(i)) return false;
			}
			return true;
		}

		return false;
	};

	const handleStepNavigation = (stepNumber: number) => {
		if (isStepNavigable(stepNumber)) {
			onNavigate(stepNumber);
		}
	};

	return (
		<Card className="overflow-hidden md:w-1/3 w-full h-auto">
			<CardContent className="p-6 space-y-4">
				{steps.map((step, index) => {
					const stepNumber = index + 1;
					const isActive = stepNumber === currentStep;
					const isCompleted = getStepCompletion(stepNumber);
					const canNavigate = isStepNavigable(stepNumber);

					return (
						<div
							key={step.id}
							className={`relative flex items-start gap-3 ${
								index < steps.length - 1
									? `before:absolute before:left-5 before:top-[2.9rem] before:h-[calc(100%-2rem)] before:w-[2px] ${
											isCompleted
												? "before:bg-primary"
												: "before:bg-zinc-200 dark:before:bg-zinc-800"
										}`
									: ""
							}`}
						>
							<StepButton
								number={stepNumber}
								isActive={isActive}
								isCompleted={isCompleted}
								isDisabled={!canNavigate}
								onClick={() => handleStepNavigation(stepNumber)}
							/>

							<div className="flex-1">
								<StepContent
									title={step.title}
									description={step.description}
									isActive={isActive}
									isDisabled={!canNavigate}
								/>
							</div>
						</div>
					);
				})}
			</CardContent>
		</Card>
	);
}
