// makeData.ts

export type User = {
    id: string;
    full_name: string;
    // lastName: string;
    email: string;
    state: string;
  };
  
  // Mock states data for the select field
  export const usStates = [
    { value: 'CA', label: 'California' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    { value: 'FL', label: 'Florida' },
    { value: 'IL', label: 'Illinois' },
    // Add more states as needed
  ];
  
  // Mock data for the table
  export const fakeData: User[] = [
    {
      id: '1',
      full_name: 'John',
    //   lastName: 'Doe',
      email: 'john.doe@example.com',
      state: 'CA',
    },
    {
      id: '2',
      full_name: 'Jane',
    //   lastName: 'Smith',
      email: 'jane.smith@example.com',
      state: 'NY',
    },
    {
      id: '3',
      full_name: 'Alice',
    //   lastName: 'Johnson',
      email: 'alice.johnson@example.com',
      state: 'TX',
    },
    {
      id: '4',
      full_name: 'Bob',
    //   lastName: 'Brown',
      email: 'bob.brown@example.com',
      state: 'FL',
    },
  ];
  