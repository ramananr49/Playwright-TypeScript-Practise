import { expect, test, Page, TestInfo } from "@playwright/test";

test("Handling Drag related scenario in PW_TS", async ({page}, testInfo) => {
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Drag"]')).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Drag"]/parent::header/following-sibling::div//p').textContent();
    await expect(input_content).toContain(" Drag me here and there ");
    await page.locator('a[href="/draggable"]').click();
    await expect(page.locator('h1[class^="title"]').first()).toBeVisible();
    await attachScreenshot(page, testInfo, "Landing Page Screenshot"); 

    //Let's go for a ride 😉 drag me around
    const drag_ele = await page.locator('[id="sample-box"]');

    await drag_ele.hover();
    const box = await drag_ele.boundingBox();
    const startX = box!.x + box!.width/2;
    const startY = box!.y + box!.height/2;

    await page.mouse.move(startX, startY);
    await page.mouse.down();
    // await page.mouse.move(startX+5, startY+5);
    await page.mouse.move(startX+100, startY+150, {steps: 25});
    await page.mouse.up();
  
    await page.waitForTimeout(4000);
    await attachScreenshot(page, testInfo, "Dragged Screenshot");

})

async function attachScreenshot(page: Page, testInfo: TestInfo, SS_name: string = "Screenshot") {
    const ss = await page.screenshot();
    testInfo.attach(SS_name, {
        body: ss,
        contentType: 'image/png'
    })
}