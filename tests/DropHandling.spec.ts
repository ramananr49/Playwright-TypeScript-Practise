import { expect, test, Page, TestInfo } from "@playwright/test";

test("Handling Drop related scenario in PW_TS", async ({page}, testInfo) => {
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Drop"]')).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Drop"]/parent::header/following-sibling::div//p').textContent();
    await expect(input_content).toContain(" Feel free to bounce me ");
    await page.locator('a[href="/droppable"]').click();
    await expect(page.locator('h1[class^="title"]').first()).toBeVisible();
    await attachScreenshot(page, testInfo, "Landing Page Screenshot"); 

    //Drag the source box with in the target box

    const source_ele = page.locator('[id="draggable"]');
    const target_ele = page.locator('[id="droppable"]');

    const source_Box = await source_ele.boundingBox();
    const target_Box = await target_ele.boundingBox();

    await source_ele.hover();
    const startX = source_Box!.x + source_Box!.width / 2;
    const startY = source_Box!.y + source_Box!.height / 2;

    const endX = target_Box!.x + target_Box!.width / 2;
    const endY = target_Box!.y + target_Box!.height /2;


    await source_ele.hover();
    await page.mouse.move(startX, startY);
    await page.mouse.down();

    await page.mouse.move(endX, endY, {steps: 30});
    await page.mouse.up();

    await attachScreenshot(page, testInfo, "Drag and Dropped Screenshot");
})

async function attachScreenshot(page: Page, testInfo: TestInfo, SS_name: string = "Screenshot") {
    const ss = await page.screenshot();
    testInfo.attach(SS_name, {
        body: ss,
        contentType: 'image/png'
    })
}