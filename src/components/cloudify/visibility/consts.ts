import { reduce } from 'lodash';
import type { SemanticICONS, SemanticCOLORS } from 'semantic-ui-react';
import type { Visibility } from './types';

type Visibilities = Record<
    string,
    {
        name: Visibility;
        icon: SemanticICONS;
        color: SemanticCOLORS;
        title: string;
    }
>;

export const visibilities: Visibilities = {
    PRIVATE: { name: 'private', icon: 'lock', color: 'red', title: 'Private resource' },
    TENANT: { name: 'tenant', icon: 'user', color: 'green', title: 'Tenant resource' },
    GLOBAL: { name: 'global', icon: 'globe', color: 'blue', title: 'Global resource' },
    UNKNOWN: { name: 'unknown', icon: 'question', color: 'grey', title: 'Unknown resource visibility' }
};

export const visibilityTitle = reduce(
    visibilities,
    (result, visibilityObject) => {
        result[visibilityObject.name] = visibilityObject.title;
        return result;
    },
    {} as Record<Visibility, string>
);

export const defaultVisibility = visibilities.UNKNOWN.name;
