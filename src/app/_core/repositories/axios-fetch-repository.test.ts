import axios from 'axios';
import { AxiosFetchRepository } from './axios-fetch-repository';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosFetchRepository', () => {
  let repository: AxiosFetchRepository;

  beforeEach(() => {
    mockedAxios.create.mockReturnValue(mockedAxios);
    repository = new AxiosFetchRepository();
  });

  it('should make a GET request and return data', async () => {
    const mockData = { data: 'test data' };
    mockedAxios.get.mockResolvedValue({ data: mockData } as any);

    const result = await repository.get('/test-url');
    expect(result).toEqual(mockData);
    expect(mockedAxios.get).toHaveBeenCalledWith('/test-url', undefined);
  });

  it('should make a POST request and return data', async () => {
    const mockData = { data: 'test data' };
    mockedAxios.post.mockResolvedValue({ data: mockData } as any);

    const result = await repository.post('/test-url', { some: 'data' });
    expect(result).toEqual(mockData);
    expect(mockedAxios.post).toHaveBeenCalledWith('/test-url', { some: 'data' }, undefined);
  });

  it('should make a PUT request and return data', async () => {
    const mockData = { data: 'test data' };
    mockedAxios.put.mockResolvedValue({ data: mockData } as any);

    const result = await repository.put('/test-url', { some: 'data' });
    expect(result).toEqual(mockData);
    expect(mockedAxios.put).toHaveBeenCalledWith('/test-url', { some: 'data' }, undefined);
  });

  it('should make a DELETE request and return data', async () => {
    const mockData = { data: 'test data' };
    mockedAxios.delete.mockResolvedValue({ data: mockData } as any);

    const result = await repository.delete('/test-url');
    expect(result).toEqual(mockData);
    expect(mockedAxios.delete).toHaveBeenCalledWith('/test-url', undefined);
  });
});
