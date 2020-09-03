import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { render, fireEvent, screen } from '@testing-library/react';

import EditTractOwnership from './';

describe('EditTractOwnership', () => {
  test('Should render without a value', () => {
    render(<EditTractOwnership />);

    expect(screen.getByText('Add Mineral Interest')).toBeInTheDocument();
  });

  test('Should render with mineral interests', () => {
    const value = [
      {
        id: uuidv4(),
        owner: 'Luke Skywalker',
        interest: '50',
        lease: 'Tatooine Lease',
        npris: [],
      },
      {
        id: uuidv4(),
        owner: 'Leia Organa',
        interest: '5',
        lease: 'Alderaan Lease',
        npris: [],
      },
    ];

    render(<EditTractOwnership value={value} />);

    const lukeMineralInterest = screen.getByTestId(
      `mineralInterest-${value[0].id}`
    );
    expect(lukeMineralInterest).toBeInTheDocument();

    const leiaMineralInterest = screen.getByTestId(
      `mineralInterest-${value[1].id}`
    );
    expect(leiaMineralInterest).toBeInTheDocument();

    expect(screen.getByText('Add Mineral Interest')).toBeInTheDocument();
  });

  test('Should render with mineral interests and npris', () => {
    const value = [
      {
        id: uuidv4(),
        owner: 'Luke Skywalker',
        interest: '50',
        lease: 'Tatooine Lease',
        npris: [
          {
            id: uuidv4(),
            owner: 'Han Solo',
            interest: '10',
          },
        ],
      },
      {
        id: uuidv4(),
        owner: 'Leia Organa',
        interest: '5',
        lease: 'Alderaan Lease',
      },
    ];

    render(<EditTractOwnership value={value} />);

    const lukeMineralInterest = screen.getByTestId(
      `mineralInterest-${value[0].id}`
    );
    expect(lukeMineralInterest).toBeInTheDocument();

    const leiaMineralInterest = screen.getByTestId(
      `mineralInterest-${value[1].id}`
    );
    expect(leiaMineralInterest).toBeInTheDocument();

    const hanNPRI = screen.getByTestId(`npri-${value[0].npris[0].id}`);
    expect(hanNPRI).toBeInTheDocument();

    expect(screen.getByText('Add Mineral Interest')).toBeInTheDocument();
  });

  test('Should add empty mineral interest row', () => {
    let result;

    render(<EditTractOwnership onChange={(v) => (result = v)} />);

    const addMineralInterest = screen.getByText('Add Mineral Interest');
    fireEvent.click(addMineralInterest);

    expect(result.length).toEqual(1);
    expect(result[0].id).not.toBeNull();
  });

  test('Should add and update mineral interest row', () => {
    let result;

    render(<EditTractOwnership onChange={(v) => (result = v)} />);

    const addMineralInterest = screen.getByText('Add Mineral Interest');
    fireEvent.click(addMineralInterest);

    const id = result[0].id;

    const ownerInput = screen.getByTestId(`mineralInterest-${id}.owner`);
    fireEvent.change(ownerInput, { target: { value: 'Luke Skywalker' } });

    const interestInput = screen.getByTestId(`mineralInterest-${id}.interest`);
    fireEvent.change(interestInput, { target: { value: '40' } });

    const leaseInput = screen.getByTestId(`mineralInterest-${id}.lease`);
    fireEvent.change(leaseInput, { target: { value: 'Tatooine Lease' } });

    expect(result.length).toEqual(1);
    expect(result[0].id).not.toBeNull();
    expect(result[0].owner).toEqual('Luke Skywalker');
    expect(result[0].interest).toEqual('40');
    expect(result[0].lease).toEqual('Tatooine Lease');
  });

  test('Should add and update mineral interest + NPRI row', () => {
    let result;

    render(<EditTractOwnership onChange={(v) => (result = v)} />);

    const addMineralInterest = screen.getByText('Add Mineral Interest');
    fireEvent.click(addMineralInterest);

    const addNPRI = screen.getByText('Add NPRI');
    fireEvent.click(addNPRI);

    const id = result[0].id;

    const ownerInput = screen.getByTestId(`mineralInterest-${id}.owner`);
    fireEvent.change(ownerInput, { target: { value: 'Luke Skywalker' } });

    const interestInput = screen.getByTestId(`mineralInterest-${id}.interest`);
    fireEvent.change(interestInput, { target: { value: '40' } });

    const leaseInput = screen.getByTestId(`mineralInterest-${id}.lease`);
    fireEvent.change(leaseInput, { target: { value: 'Tatooine Lease' } });

    const npriId = result[0].npris[0].id;

    const npriOwnerInput = screen.getByTestId(`npri-${npriId}.owner`);
    fireEvent.change(npriOwnerInput, { target: { value: 'Han Solo' } });

    const npriInterestInput = screen.getByTestId(`npri-${npriId}.interest`);
    fireEvent.change(npriInterestInput, { target: { value: '10' } });

    expect(result.length).toEqual(1);
    expect(result[0].id).not.toBeNull();
    expect(result[0].owner).toEqual('Luke Skywalker');
    expect(result[0].interest).toEqual('40');
    expect(result[0].lease).toEqual('Tatooine Lease');

    expect(result[0].npris[0].id).not.toBeNull();
    expect(result[0].npris[0].owner).toEqual('Han Solo');
    expect(result[0].npris[0].interest).toEqual('10');
  });

  test('Should remove mineral interest row', () => {
    let result;
    const value = [
      {
        id: uuidv4(),
        owner: 'Luke Skywalker',
        interest: '50',
        lease: 'Tatooine Lease',
      },
      {
        id: uuidv4(),
        owner: 'Leia Organa',
        interest: '5',
        lease: 'Alderaan Lease',
      },
    ];

    render(<EditTractOwnership value={value} onChange={(v) => (result = v)} />);

    const id = value[0].id;
    const removeButton = screen.getByTestId(`mineralInterest-${id}.remove`);
    fireEvent.click(removeButton);

    expect(result.length).toEqual(1);
    expect(result[0].id).not.toBeNull();
    expect(result[0].owner).toEqual('Leia Organa');
    expect(result[0].interest).toEqual('5');
    expect(result[0].lease).toEqual('Alderaan Lease');
  });

  test('Should remove NPRI row', () => {
    let result;
    const value = [
      {
        id: uuidv4(),
        owner: 'Luke Skywalker',
        interest: '50',
        lease: 'Tatooine Lease',
        npris: [
          {
            id: uuidv4(),
            owner: 'Han Solo',
            interest: '10',
          },
        ],
      },
      {
        id: uuidv4(),
        owner: 'Leia Organa',
        interest: '5',
        lease: 'Alderaan Lease',
      },
    ];

    render(<EditTractOwnership value={value} onChange={(v) => (result = v)} />);

    const id = value[0].npris[0].id;
    const removeButton = screen.getByTestId(`npri-${id}.remove`);
    fireEvent.click(removeButton);

    expect(result.length).toEqual(2);
    expect(result[0].id).not.toBeNull();
    expect(result[0].owner).toEqual('Luke Skywalker');
    expect(result[0].interest).toEqual('50');
    expect(result[0].lease).toEqual('Tatooine Lease');
    expect(result[0].npris.length).toEqual(0);
  });
});
