import initStoryshots from '@storybook/addon-storyshots';

jest.mock('react-dom', () => ({
    createPortal: (value: unknown) => value,

    findDOMNode: () => ({ addEventListener: () => {} })
}));

initStoryshots();
