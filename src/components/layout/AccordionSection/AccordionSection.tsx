import type { PropsWithChildren } from 'react';
import React from 'react';
import type { AccordionTitleProps } from 'semantic-ui-react';
import { Accordion, Icon, Segment } from 'semantic-ui-react';
import { useToggle } from '../../..';

const accordionTitleStyle = {
    paddingBottom: 1,
    paddingTop: 5
};

const accordionContentStyle = {
    overflow: 'visible',
    paddingTop: 14
};

export interface AccordionSectionProps {
    /**
     * Accordion title
     */
    title: string;
    /**
     * Whether the section should be initially active
     */
    initialActive?: boolean;
    /**
     * Active section index
     */
    activeSection?: number;
    /**
     * Index assigned to this section
     */
    index?: number;
    /**
     * Click handler
     */
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, props: AccordionTitleProps) => void;
}

/**
 * Accordion title and content combined into a single component.
 */
export function AccordionSection({
    title,
    children,
    initialActive = false,
    activeSection,
    index,
    onClick
}: PropsWithChildren<AccordionSectionProps>) {
    const [accordionActive, toggleAccordionActive] = useToggle(initialActive);

    const active = activeSection !== undefined ? activeSection === index : accordionActive;

    const handleClick = activeSection !== undefined ? onClick : toggleAccordionActive;

    return (
        <Segment>
            <Accordion.Title style={accordionTitleStyle} active={active} index={index} onClick={handleClick}>
                <Icon name="dropdown" />
                {title}
            </Accordion.Title>
            <Accordion.Content style={accordionContentStyle} active={active}>
                {children}
            </Accordion.Content>
        </Segment>
    );
}

export default AccordionSection;
