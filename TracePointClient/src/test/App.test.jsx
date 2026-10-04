import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from '../App.jsx';
import { InvestigationProvider } from '../context/InvestigationContext.jsx';
import { mockFetch } from './mockApi.js';

function renderApp(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <InvestigationProvider>
        <App />
      </InvestigationProvider>
    </MemoryRouter>
  );
}

afterEach(() => vi.unstubAllGlobals());

describe('Home page', () => {
  it('shows the title and the Start Investigation button leads to the case page', async () => {
    mockFetch();
    const user = userEvent.setup();
    renderApp('/');

    expect(screen.getByRole('heading', { name: /the missing prototype/i })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: /start investigation/i }));

    expect(await screen.findByText(/A technology company has reported/i)).toBeInTheDocument();
  });
});

describe('Navigation', () => {
  it('links to all five pages and navigates without typing URLs', async () => {
    mockFetch();
    const user = userEvent.setup();
    renderApp('/');

    const nav = screen.getByRole('navigation', { name: /main navigation/i });
    for (const label of ['Home', 'Case', 'Suspects', 'Evidence', 'Investigation']) {
      expect(within(nav).getByRole('link', { name: label })).toBeInTheDocument();
    }

    await user.click(within(nav).getByRole('link', { name: 'Evidence' }));
    expect(screen.getByRole('heading', { name: 'Evidence' })).toBeInTheDocument();

    await user.click(within(nav).getByRole('link', { name: 'Investigation' }));
    expect(screen.getByRole('heading', { name: /submit investigation/i })).toBeInTheDocument();
  });

  it('shows a not-found page for unknown URLs', () => {
    mockFetch();
    renderApp('/nothing-here');
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument();
  });
});

describe('Case page', () => {
  it('displays the case name, status and description from the API', async () => {
    mockFetch();
    renderApp('/case');

    expect(screen.getByRole('status')).toHaveTextContent(/loading case/i);
    expect(await screen.findByRole('heading', { name: 'The Missing Prototype' })).toBeInTheDocument();
    expect(screen.getByText('OPEN')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view suspects/i })).toHaveAttribute('href', '/suspects');
    expect(screen.getByRole('link', { name: /view evidence/i })).toHaveAttribute('href', '/evidence');
  });

  it('shows a meaningful error when the API cannot be reached', async () => {
    mockFetch({ failing: true });
    renderApp('/case');

    expect(await screen.findByRole('alert')).toHaveTextContent(/could not reach the tracepoint api/i);
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });
});

describe('Suspects page', () => {
  it('displays every suspect returned by the API using SuspectCard', async () => {
    mockFetch();
    renderApp('/suspects');

    expect(await screen.findByRole('heading', { name: 'Alex Morgan' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Jamie Smith' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Taylor Williams' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /select suspect/i })).toHaveLength(3);
  });

  it('stores the selected suspect in state and updates the interface', async () => {
    mockFetch();
    const user = userEvent.setup();
    renderApp('/suspects');

    await screen.findByRole('heading', { name: 'Jamie Smith' });
    expect(screen.queryByText(/selected suspect:/i)).not.toBeInTheDocument();

    const jamieCard = screen.getByRole('heading', { name: 'Jamie Smith' }).closest('article');
    await user.click(within(jamieCard).getByRole('button', { name: /select suspect/i }));

    expect(within(jamieCard).getByRole('button', { name: /selected/i })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText(/selected suspect:/i)).toHaveTextContent('Jamie Smith');
    expect(screen.getAllByRole('button', { name: /select suspect/i })).toHaveLength(2);
  });

  it('remembers the selected suspect on the Investigation page', async () => {
    mockFetch();
    const user = userEvent.setup();
    renderApp('/suspects');

    await screen.findByRole('heading', { name: 'Taylor Williams' });
    const card = screen.getByRole('heading', { name: 'Taylor Williams' }).closest('article');
    await user.click(within(card).getByRole('button', { name: /select suspect/i }));

    await user.click(within(screen.getByRole('navigation')).getByRole('link', { name: 'Investigation' }));
    expect(screen.getByText(/selected suspect:/i)).toHaveTextContent('Taylor Williams');
  });

  it('shows an error message when suspects cannot be loaded', async () => {
    mockFetch({ failing: true });
    renderApp('/suspects');
    expect(await screen.findByRole('alert')).toHaveTextContent(/could not reach/i);
  });
});
