import initStoryshots from '@storybook/addon-storyshots';

jest.mock('react-dom', () => ({
    // @ts-expect-error TS(7006) FIXME: Parameter 'value' implicitly has an 'any' type.
    createPortal: value => value,

    findDOMNode: () => ({ addEventListener: () => {} })
}));

initStoryshots();
