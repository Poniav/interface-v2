import { describe, it, afterEach } from 'vitest';
import { cleanup, render } from '@testing-library/svelte';
import SausageLink from './SausageLink.svelte';

describe('SausageLink', () => {
	afterEach(() => {
		cleanup();
	});

	it('renders without errors', () => {
		const { container } = render(SausageLink);
		expect(container).toMatchSnapshot();
	});

	it('renders an anchor tag with passed in href', () => {
		const { getByRole } = render(SausageLink, { props: { href: 'thisisatesthrefforsausagelink' } });
		const anchor = getByRole('link');
		expect(anchor.getAttribute('href')).toBe('thisisatesthrefforsausagelink');
	});

	it('renders the text passed to it', () => {
		const { getByText } = render(SausageLink, {
			props: { text: 'thisisthecustomtextforsausagebutton' }
		});
		expect(getByText('thisisthecustomtextforsausagebutton')).toBeTruthy();
	});

	it('renders the image which indicates it is a link', () => {
		const { getByAltText } = render(SausageLink, {
			props: {
				href: 'the link href',
				text: 'the link text'
			}
		});

		const image = getByAltText('Open');
		const staticImagesImported = { OpenInNew: '/images/openinnew.svg' };
		expect(image.getAttribute('src')).toBe(staticImagesImported.OpenInNew);
	});
});
