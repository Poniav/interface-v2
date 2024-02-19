import { MetaMask, testWithSynpress, unlockForFixture } from '@synthetixio/synpress'
import BasicSetup from '../../wallet-setup/basic.setup'
import { OYSTER_OWNER_INVENTORY_URL } from '../../../src/lib/utils/constants/urls';
import { loginToMetamask } from '../../helpers/metamask';
import { MESSAGES } from '../../../src/lib/utils/constants/messages';

const test = testWithSynpress(BasicSetup, unlockForFixture)
const { expect } = test;

test('Copy Enclave Image URL', async ({ context, page, metamaskPage, extensionId }) => {
    await page.goto(OYSTER_OWNER_INVENTORY_URL, { waitUntil: 'networkidle' });

    const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId)
    await loginToMetamask(metamask, page);

    const hasText = await page.textContent('text=My Active Orders');
    expect(hasText).toBeTruthy();

    const rows = await page.$$eval('tbody tr', rows => rows);

    if (rows.length > 0) {
        const expandRowToggleButton = await page.$('tbody tr:nth-child(1) td:last-child button');
        if (expandRowToggleButton && !(await expandRowToggleButton.isDisabled())) {
            await expandRowToggleButton.click();
            await page.locator('text=DETAILS').first().click();
            await page.waitForSelector('text=ORDER DETAILS');
            await page.getByTestId('enclave-image-url').getByAltText('Copy').first().click();
            await page.waitForSelector('text=Enclave Image URL copied to clipboard');
        }
    } else {
        test.skip();
    }

})

test('Initiate Stop', async ({ context, page, metamaskPage, extensionId }) => {
    await page.goto(OYSTER_OWNER_INVENTORY_URL, { waitUntil: 'networkidle' });

    const metamask = new MetaMask(context, metamaskPage, BasicSetup.walletPassword, extensionId)
    await loginToMetamask(metamask, page);

    const hasText = await page.textContent('text=My Active Orders');
    expect(hasText).toBeTruthy();

    const rows = await page.$$eval('tbody tr', rows => rows);

    if (rows.length > 0) {
        const expandRowToggleButton = await page.$('tbody tr:nth-child(1) td:last-child button');
        if (expandRowToggleButton && !(await expandRowToggleButton.isDisabled())) {
            await expandRowToggleButton.click();
            await page.locator('text=INITIATE STOP').first().click();
            await page.waitForSelector('text=INITIATE STOP');
            await page.locator('text=INITIATE STOP').click();
            await metamask.confirmTransactionAndWaitForMining();
            await page.waitForSelector(`text=${MESSAGES.TOAST.TRANSACTION.SUCCESS} ${MESSAGES.TOAST.ACTIONS.AMEND_RATE_JOB.INITIATED}`)
        }
    } else {
        test.skip();
    }

})