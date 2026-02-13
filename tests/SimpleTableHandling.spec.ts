import { expect, test, Page, TestInfo } from "@playwright/test";
import { before } from "node:test";

test("Handling Simple Table Scenario in PW_TS", async ({page}, testInfo) => {
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Table"]').first()).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Table"]/parent::header/following-sibling::div//p').first().textContent();
    await expect(input_content).toContain(" It's all about rows & columns ");
    await page.locator('a[href="/table"]').click();
    await expect(page.locator('h1[class^="title"]').first()).toBeVisible();
    await attachScreenshot(page, testInfo, "Landing Page Screenshot");
    await page.waitForLoadState('domcontentloaded');

    //Shopping List
    //~ Add all the prices and check if the total is correct
    const prices_ele = await page.locator('[id="shopping"] tbody tr td:nth-child(2)');
    const total_ele = await page.locator('[id="shopping"] tfoot td:nth-child(2)');
    let actual_total = 0
    for (let i=0; i< await prices_ele.count(); i++) {
        let curr_price =  await prices_ele.nth(i).textContent() ?? "0";
        actual_total += parseInt(curr_price);
    }

    const total = parseInt(await total_ele.textContent() ?? "0");

    await expect(total).toEqual(actual_total);
    console.log(`Total : ${total} & & Actual Total : ${actual_total}`)
    await attachScreenshot(page, testInfo, "Shopping List");

    //Let's handle it😉
    //~ Mark Raj as present

    const fname_ele = await page.locator('[id="simpletable"] tbody td:nth-child(1)');
    const lname_ele = await page.locator('[id="simpletable"] tbody td:nth-child(2)');

    const markPresentName = "Raj";
    const row = await fname_ele.count();

    for(let i = 0; i<row; i++) {
        if (markPresentName === await fname_ele.nth(i).textContent()) {
            await fname_ele.nth(i).locator("xpath=following-sibling::td/input").check();
        }
        else if (markPresentName === await lname_ele.nth(i).textContent()) {
            await lname_ele.nth(i).locator("xpath=following-sibling::td/input").check();
        }
    }

    const dynamic_checkbox = page.locator(`//td[text()="${markPresentName}"]/following-sibling::td/input`);
    await expect(dynamic_checkbox).toBeChecked();
    await attachScreenshot(page, testInfo, "Marked Raj as Present");

    await dynamic_checkbox.uncheck();
    await expect(dynamic_checkbox).not.toBeChecked();
    await attachScreenshot(page, testInfo, "UnMarkes Raj as Present");

    /*
        Sortable Tables
        ~ Check if the sorting is working properly
    */
    
    const names_ele = await page.locator('//table[contains(@class, "mat-sort")]//tr/td[1]');
    const calories_ele = await page.locator('//table[contains(@class, "mat-sort")]//tr/td[2]');
    const before_sort_names = [];

    const names_count = await names_ele.count();
    for (let i = 0; i<names_count; i++) {
        const temp_name = await names_ele.nth(i).textContent();
        before_sort_names.push(temp_name);
    }
    console.log(before_sort_names);

    const sorted_expected_names = before_sort_names.sort();
    console.log(sorted_expected_names);
    console.log("******************************")

    await getDynamicColumnHeader(page, "name").click();
    await page.waitForTimeout(1000);
    
    const after_sort_names_ascending = [];
    for(let j=0; j<names_count; j++) {
        const temp_name = await names_ele.nth(j).textContent();
        after_sort_names_ascending.push(temp_name);
    }
    console.log(after_sort_names_ascending);
    await expect(after_sort_names_ascending).toEqual(sorted_expected_names);

    const des_sorted_expected_names = before_sort_names.sort().reverse();
    console.log(des_sorted_expected_names);
    console.log("******************************")

    await getDynamicColumnHeader(page, "name").click();
    await page.waitForTimeout(1000);
    const after_sort_names_descending = [];
    for(let k=0; k<names_count; k++) {
        const temp_name = await names_ele.nth(k).textContent();
        after_sort_names_descending.push(temp_name);
    }
    console.log(after_sort_names_descending);
    await expect(after_sort_names_descending).toEqual(des_sorted_expected_names);

})

async function attachScreenshot(page: Page, testInfo: TestInfo, SS_name:string="Screenshot") {
    const ss = await page.screenshot();
    testInfo.attach(SS_name, {
        body: ss,
        contentType: 'image/png',
    })
}

function getDynamicColumnHeader(page: Page, header: string) {
    return page.locator(`th[mat-sort-header="${header}"]`);
}