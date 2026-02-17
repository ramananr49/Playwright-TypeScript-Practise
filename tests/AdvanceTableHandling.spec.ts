import { expect, test, TestInfo , Page} from "@playwright/test";
import { execPath } from "node:process";

test("Hanlding File upload download scenario in PW_TS", async ({page}, testInfo) => {
    
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Table"]').last()).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Table"]/parent::header/following-sibling::div//p').last().textContent();
    await expect(input_content).toContain(" It's little complicated but give a try ");
    await page.locator('a[href="/advancedtable"]').click();
    await expect(page.locator('h1[class^="title"]').first()).toBeVisible();
    await attachScreenshot(page, testInfo, "Landing Page Screenshot");
    await page.waitForLoadState('domcontentloaded');


    //Elements
    const entriesPerPageEle = await page.locator('[id^="dt-length"]');
    const serachFieldEle = await page.locator('[id^="dt-search"]');
    const tablerowEle = await page.locator('[id="advancedtable"] tbody > tr');
    const showingEntryInfoEle = await page.locator('[id="advancedtable_info"]');
    const firstArrowEle = await page.locator('button[data-dt-idx="first"]');
    const previousArrowEle = await page.locator('button[data-dt-idx="previous"]');
    const nextArrowEle = await page.locator('[aria-label="Next"]');
    const lastArrowEle = await page.locator('[data-dt-idx="last"]')
    const universityHeaderEle = await page.locator('//span[@class="dt-column-title" and text()="UNIVERSITY NAME"]');


    //verify the Pages per record functionality    
    await verifyRecordPerPage(10);
    await attachScreenshot(page, testInfo, "10 Record per Page Screenshot");
    await verifyRecordPerPage(25);
    await attachScreenshot(page, testInfo, "25 Record per Page Screenshot");
    await verifyRecordPerPage(5);
    await attachScreenshot(page, testInfo, "5 Record per Page Screenshot");

    async function verifyRecordPerPage(recordCount: Number) {
        await entriesPerPageEle.selectOption({value:`${recordCount}`}, {timeout:1000});
        const RowCount = await tablerowEle.count();
        await expect(RowCount).toEqual(recordCount);
    }

    //verify the search textbox field functionality
    await serachFieldEle.fill("newport");
    const recordCount = await tablerowEle.count();
    await expect(recordCount).toEqual(2);
    await attachScreenshot(page, testInfo, "Search field Textfield Screenshot");
    await serachFieldEle.clear();
    await expect(showingEntryInfoEle).toContainText("Showing 1 to 5 of 47 entries");

    //verify the pagination functionality
    await CheckArrowButtonEnablement(5, 10);
    await attachScreenshot(page, testInfo, "5 Record Pagination Screenshot");
    // await CheckArrowButtonEnablement(10, 5);
    // await attachScreenshot(page, testInfo, "10 Record Pagination Screenshot");
    // await CheckArrowButtonEnablement(25, 2);
    // await attachScreenshot(page, testInfo, "25 Record Pagination Screenshot");
    

    async function CheckArrowButtonEnablement(pagePerRecord: Number, pageCount: number) {
        await entriesPerPageEle.selectOption({value:`${pagePerRecord}`});
        for (let i=1; i<=pageCount; i++) {
            if ( i === 1) {
                await expect(firstArrowEle).toBeDisabled();
                await expect(previousArrowEle).toBeDisabled();
                await expect(nextArrowEle).toBeEnabled();
                await expect(lastArrowEle).toBeEnabled();
                await nextArrowEle.click();
            }
            else if ( i === 10) {
                await expect(firstArrowEle).toBeEnabled();
                await expect(previousArrowEle).toBeEnabled();
                await expect(nextArrowEle).toBeDisabled();
                await expect(lastArrowEle).toBeDisabled();
            }
            else {
                await expect(firstArrowEle).toBeEnabled();
                await expect(previousArrowEle).toBeEnabled();
                await expect(nextArrowEle).toBeEnabled();
                await expect(lastArrowEle).toBeEnabled();
                await nextArrowEle.click();
            }
        }
    }

})


async function attachScreenshot(page: Page, testInfo: TestInfo, name: string="Screenshot") {
    
    const ss = await page.screenshot()
    testInfo.attach(name, {
        body: ss,
        contentType: 'image/png'
    })
}

