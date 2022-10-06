import React from 'react';

interface ProductNameProps {
    name: string;
}

export default function ProductName({ name }: ProductNameProps) {
    return <span style={{ verticalAlign: 'middle' }}>{name}</span>;
}
