import { expect, test } from "@playwright/test";

test("Handling Alert related scenario in PW_TS", async ({page}, testInfo) => {
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Alert"]')).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Alert"]/parent::header/following-sibling::div//p').textContent();
    await expect(input_content).toContain(" Interact with different types of dialog boxes ");
    await page.locator('a[href="/alert"]').click();
    await expect(page.locator('h1[class^="title"]')).toBeVisible();
        //Screenshot
    const ss = await page.screenshot();
    testInfo.attach("Landing Page Screenshot", {
        body: ss,
        contentType: 'image/png',
    })

    //Accept the Alert
    page.once("dialog", dialog => {
        console.log(dialog.message());
        dialog.accept();
    })
    await page.getByRole("button", {name: "Simple Alert"}).click();

    //Dismiss the Alert & print the alert text
    page.once("dialog", dialog => {
        console.log(dialog.message());
        dialog.dismiss();
    })
    await page.getByRole("button", {name: "Confirm Alert"}).click();

    //Type your name & accept
    page.once("dialog", dialog => {
        dialog.accept("John Kennady");
    })
    await page.getByRole("button", {name: "Prompt Alert"}).click();
    const myname = await page.locator('[id="myName"]').textContent();
    await expect(myname).toContain("Your name is: John Kennad");

    //Sweet alert
    await page.getByRole("button", {name: 'Modern Alert'}).click();
    const alertText = await page.locator('p[class="title"]').textContent();
    await expect(alertText).toContain("Modern Alert - Some people address me as sweet alert as well ");
    await page.locator('button[aria-label="close"]').click();
    console.log(alertText);
    await expect(page.locator('h1[class^="title"]')).toBeVisible();

    const ss1 = await page.screenshot();
    testInfo.attach("Test Completion", {
        body: ss1,
        contentType: 'image/png',
    })
})