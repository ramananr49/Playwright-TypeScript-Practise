import { expect, test, Page, TestInfo } from "@playwright/test";
import { exec } from "node:child_process";
import { execPath } from "node:process";

test("Handling Radio button related scenario in PW_TS", async ({page}, testInfo) => {
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Radio"]')).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Radio"]/parent::header/following-sibling::div//p').textContent();
    await expect(input_content).toContain(" Interact with different types of radio & check boxes ");
    await page.locator('a[href="/radio"]').click();
    await expect(page.locator('h1[class^="title"]').first()).toBeVisible();
    await attachScreenshot(page, testInfo, "Landing Page Screenshot");

    //Select any one
    const yes_radio = await page.locator('[id="yes"]');
    const no_radio = await page.locator('[id="no"]');
    await expect(yes_radio).toBeEnabled();
    await expect(no_radio).toBeEnabled();
    await yes_radio.click();
    await expect(yes_radio).toBeChecked();
    await expect(no_radio).not.toBeChecked();
    await attachScreenshot(page, testInfo, "Select any one Screenshot");

    //Cofirm you can select only one radio button
    const confirm_yes = await page.locator('[id="one"]');
    const confirm_no = await page.locator('[id="two"]');
    await expect(confirm_yes).not.toBeChecked();
    await expect(confirm_no).not.toBeChecked();
    await confirm_yes.check();
    await expect(confirm_yes).toBeChecked();
    await expect(confirm_no).not.toBeChecked();
    await confirm_no.check();
    await expect(confirm_yes).not.toBeChecked();
    await expect(confirm_no).toBeChecked();
    await attachScreenshot(page, testInfo, "Select only one Screenshot");

    //Find the bug
    const bug_yes = await page.locator('[id="nobug"]');
    const bug_no = await page.locator('[id="bug"]')
    await expect(bug_yes).not.toBeChecked();
    await expect(bug_no).not.toBeChecked();
    await bug_yes.check();
    await expect(bug_yes).toBeChecked();
    await expect(bug_no).not.toBeChecked();
    await bug_no.check();
    await expect(bug_yes).toBeChecked();
    await expect(bug_no).toBeChecked();
    console.log("******Bug**********");
    await attachScreenshot(page, testInfo, "bug Screenshot");

    //Find which one is selected
    const fooEle = await page.locator('[id="foo"]');
    const BarEle = await page.locator('[id="notfoo"]');
    if (await fooEle.isChecked()) {
        console.log("Foo radio button is selected");
    }
    else if (await BarEle.isChecked() ) {
        console.log("Bar radio button is selected");
    }

    //Confirm last field is disabled
    const common_ele_disable = await page.locator('[name="plan"]');
    const ele_count: number = await common_ele_disable.count();
    await expect(common_ele_disable.first()).toBeEnabled();
    await expect(common_ele_disable.last()).toBeDisabled();
    for (let i:number=0; i < ele_count; i++) {
        if (i+1 === ele_count) {
            console.log(`${i+1} of ${ele_count} elmeent is disabled`);
        } else {
            console.log(`${i+1} of ${ele_count} elmeent is enabled`);
        }
    }

    //Find if the checkbox is selected?
    const remember_me = await page.locator('[type="checkbox"]').first();
    await expect(remember_me).toBeChecked();

    //Accept the T&C
    const TandC_ele = await page.locator('[type="checkbox"]').last();
    await TandC_ele.check();
    await expect(TandC_ele).toBeChecked();
    await attachScreenshot(page, testInfo, "Final Screenshot");

})

async function attachScreenshot(page: Page, testInfo: TestInfo, SS_name: string = "Defult Screenshot") {
    const ss = await page.screenshot();
    testInfo.attach(SS_name, {
        body: ss,
        contentType: 'image/png',
    })
}