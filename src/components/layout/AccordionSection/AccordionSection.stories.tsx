import React from 'react';
import type { ComponentStory } from '@storybook/react';
import LiveEditDecorator from 'decorators/LiveEditDecorator';
import { Accordion } from 'semantic-ui-react';
import AccordionSection from './AccordionSection';

export default {
    title: 'Layout/AccordionSection',
    component: AccordionSection,
    decorators: [LiveEditDecorator({ AccordionSection, Accordion })]
};

type AccordionSectionStory = ComponentStory<typeof AccordionSection>;

export const basic: AccordionSectionStory = () => (
    <Accordion>
        <AccordionSection title="Accordion title">Accordion content</AccordionSection>
    </Accordion>
);
basic.storyName = 'Default';

export const initiallyActive: AccordionSectionStory = () => (
    <Accordion>
        <AccordionSection initialActive title="Accordion title">
            Accordion content
        </AccordionSection>
    </Accordion>
);

export const withDivider: AccordionSectionStory = () => (
    <Accordion>
        <AccordionSection initialActive divider title="Accordion title">
            Accordion content
        </AccordionSection>
    </Accordion>
);
