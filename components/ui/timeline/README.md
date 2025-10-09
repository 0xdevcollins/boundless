# Timeline Component

A professional, reusable timeline component built with React and TypeScript, following best practices for component design and accessibility.

## Features

- **Flexible Design**: Support for different variants (default, compact, detailed)
- **Status Indicators**: Visual status indicators (completed, current, upcoming)
- **Responsive**: Works seamlessly across different screen sizes
- **Customizable**: Support for custom icons and styling
- **TypeScript**: Full TypeScript support with proper type definitions
- **Accessible**: Built with accessibility best practices

## Usage

### Basic Usage

```tsx
import { Timeline, TimelineItemType } from '@/components/ui/timeline';

const milestones: TimelineItemType[] = [
  {
    id: '1',
    title: 'Project Start',
    description: 'Project initialization and planning',
    date: 'Jan 2024',
    status: 'completed',
  },
  {
    id: '2',
    title: 'Development',
    description: 'Active development phase',
    date: 'Feb 2024',
    status: 'current',
  },
];

<Timeline items={milestones} />;
```

### Advanced Usage

```tsx
<Timeline
  items={milestones}
  variant='detailed'
  showConnector={true}
  className='custom-timeline'
/>
```

## Props

### Timeline Props

| Prop            | Type                                   | Default      | Description                         |
| --------------- | -------------------------------------- | ------------ | ----------------------------------- |
| `items`         | `TimelineItemType[]`                   | -            | Array of timeline items             |
| `className`     | `string`                               | `''`         | Additional CSS classes              |
| `showConnector` | `boolean`                              | `true`       | Show connecting lines between items |
| `orientation`   | `'vertical' \| 'horizontal'`           | `'vertical'` | Timeline orientation                |
| `variant`       | `'default' \| 'compact' \| 'detailed'` | `'default'`  | Visual variant                      |

### TimelineItem Props

| Prop          | Type                                      | Description           |
| ------------- | ----------------------------------------- | --------------------- |
| `id`          | `string`                                  | Unique identifier     |
| `title`       | `string`                                  | Item title            |
| `description` | `string`                                  | Item description      |
| `date`        | `string?`                                 | Optional date         |
| `status`      | `'completed' \| 'current' \| 'upcoming'?` | Item status           |
| `icon`        | `React.ReactNode?`                        | Custom icon component |

## Variants

### Default

Standard timeline with balanced spacing and typography.

### Compact

Smaller spacing and typography for dense layouts.

### Detailed

Larger spacing and typography for prominent display.

## Status Types

- **completed**: Green indicator for finished items
- **current**: Primary color indicator for active items
- **upcoming**: Gray indicator for future items

## Best Practices

1. **Unique IDs**: Always provide unique `id` values for each timeline item
2. **Descriptive Content**: Use clear, descriptive titles and descriptions
3. **Status Management**: Keep status indicators up-to-date
4. **Responsive Design**: Test across different screen sizes
5. **Accessibility**: Ensure proper contrast and keyboard navigation

## Examples

See `TimelineExample.tsx` for comprehensive usage examples.
