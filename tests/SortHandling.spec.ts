import { expect, test, Page, TestInfo } from "@playwright/test";

test("Handling Elements related scenario in PW_TS", async ({page}, testInfo) => {
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Sort"]')).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Sort"]/parent::header/following-sibling::div//p').textContent();
    await expect(input_content).toContain(" Sort out the problem quickly ");
    await page.locator('a[href="/sortable"]').click();
    await expect(page.locator('h1[class^="title"]').first()).toBeVisible();
    await attachScreenshot(page, testInfo, "Landing Page Screenshot");

    const todo_ele = page.locator('//h2[text()="To do"]/following-sibling::div//*[@id="sample-box1"]');
    const done_ele = page.locator('//h2[text()="Done"]/following-sibling::div//*[@id="sample-box1"]')

    const todo_Box = await todo_ele.first().boundingBox();
    
    const startX = todo_Box!.x + todo_Box!.width / 2;
    const startY = todo_Box!.y + todo_Box!.height / 2;

    const todo_count = await todo_ele.count();

    for (let i=0; i<todo_count; i++) {
        const done_Box = await done_ele.last().boundingBox();
        const endX = done_Box!.x + done_Box!.width / 2;
        const endY = done_Box!.y + done_Box!.height / 2;

        await todo_ele.first().hover();
        await page.mouse.move(startX,startY);
        await page.mouse.down();
        await page.mouse.move(endX, endY, {steps: 25});
        await page.mouse.up();
        await page.waitForTimeout(2000);
    }

    await attachScreenshot(page, testInfo, "Final Screenshot");
})

async function attachScreenshot(page: Page, testInfo: TestInfo, SS_name: string = "Screenshot") {
    const ss = await page.screenshot();
    testInfo.attach(SS_name, {
        body: ss,
        contentType: 'image/png'
    })
}