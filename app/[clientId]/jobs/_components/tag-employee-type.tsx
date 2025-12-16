import { Signature } from 'lucide-react';
import { FC } from 'react';
import { Badge, TailwindColor } from '~/components/fragments/badge';
import { Flex } from '~/components/layouts/flex';

export enum EmployeeType {
  'Full Time' = 'fulltime',
  'Part Time' = 'parttime',
  Contract = 'contract',
  Internship = 'internship',
}

type BadgeProps = {
  label: React.ReactNode;
  color?: TailwindColor;
  icon: React.ReactNode;
};

type Props = {
  type: string;
};

export const TagEmployeeType: FC<Props> = ({ type }) => {
  function getBadgeProps(status: string): BadgeProps {
    const badgeMap: Record<EmployeeType, BadgeProps> = {
      contract: {
        label: 'Contract',
        color: 'orange',
        icon: <Signature className="w-4 h-4 mr-2" />,
      },
      fulltime: {
        label: 'Full Time',
        color: 'green',
        icon: <Signature className="w-4 h-4 mr-2" />,
      },
      internship: {
        label: 'Internship',
        color: 'lime',
        icon: <Signature className="w-4 h-4 mr-2" />,
      },
      parttime: {
        label: 'Part Time',
        color: 'amber',
        icon: <Signature className="w-4 h-4 mr-2" />,
      },
    };

    return (
      badgeMap[status as EmployeeType] || {
        label: status,
        color: 'primary',
      }
    );
  }
  const { color, icon, label } = getBadgeProps(type);
  return (
    <Badge color={color}>
      <Flex className="my-1">
        {icon}
        {label}
      </Flex>
    </Badge>
  );
};
