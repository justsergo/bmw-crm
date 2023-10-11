import clients from './data.json';

export const getClientsName = () => clients.map(({ name }) => name);
