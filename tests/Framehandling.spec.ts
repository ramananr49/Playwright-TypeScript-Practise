import { expect, test , Page, TestInfo} from "@playwright/test";

test("Handling Frame related scenario in PW_TS", async ({page}, testInfo) => {
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Frame"]')).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Frame"]/parent::header/following-sibling::div//p').textContent();
    await expect(input_content).toContain(" Interact with different types of frames/iframes ");
    await page.locator('a[href="/frame"]').click();
    await expect(page.locator('h1[class^="title"]').first()).toBeVisible();
    await attachScreenshot(page, testInfo, "Landing Page Screenshot");

    const firstFrameEle = await page.frameLocator('[id="firstFr"]');
    await expect(firstFrameEle.locator('h1[class="title"]')).toBeVisible();
    await firstFrameEle.locator('[name="fname"]').click();
    await firstFrameEle.locator('[name="fname"]').fill("John");
    await firstFrameEle.locator('[name="lname"]').click();
    await firstFrameEle.locator('[name="lname"]').fill("Kennady");
    await attachScreenshot(page, testInfo, "first frame content Screenshot");
    const innerFrameEle = await firstFrameEle.frameLocator('[src="innerframe"]');
    await innerFrameEle.locator('[name="email"]').fill('John.Kennady@mail.com');
    await innerFrameEle.locator('[name="email"]').scrollIntoViewIfNeeded();
    await attachScreenshot(page, testInfo, "Final Screenshot");

})

async function attachScreenshot(page: Page, testInfo: TestInfo, SS_name: string = "Screenshot") {
    const ss = await page.screenshot();
    testInfo.attach(SS_name, {
        body: ss,
        contentType: 'image/png',
    })
}