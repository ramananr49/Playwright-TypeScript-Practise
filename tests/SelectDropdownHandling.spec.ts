import { expect, test } from "@playwright/test";

test("Handling Select Dropdown related scenario in PW_TS", async ({page}, testInfo) => {
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Select"]')).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Select"]/parent::header/following-sibling::div//p').textContent();
    await expect(input_content).toContain(" Interact with different types of drop-down ");
    await page.locator('a[href="/dropdowns"]').click();
    await expect(page.locator('h1[class^="title"]')).toBeVisible();
        //Screenshot
    const ss = await page.screenshot();
    testInfo.attach("Landing Page Screenshot", {
        body: ss,
        contentType: 'image/png',
    })

    //Select the Apple uing Visible text
    const fruitDropdown = await page.locator('[id="fruits"]');
    await fruitDropdown.selectOption({value: "0"});
    await expect(page.locator('p[class="subtitle"]')).toBeVisible();
    await expect(page.locator('p[class="subtitle"]')).toHaveText("You have selected Apple");
    await fruitDropdown.selectOption({index: 2});
    await expect(page.locator('p[class="subtitle"]')).toHaveText("You have selected Mango");
    await fruitDropdown.selectOption("Orange");
    await expect(page.locator('p[class="subtitle"]')).toHaveText("You have selected Orange");

    //Select your super heros
    const superheroDropdown = await page.locator('[id="superheros"]');
    await expect(superheroDropdown).toHaveAttribute("multiple");
    await superheroDropdown.selectOption(["Ant-Man", "Batman", "Daredevil"]);
    const superHeroText = await page.locator('p[class="subtitle"]').last();
    await expect(superHeroText).toBeVisible();
    await expect(superHeroText).toContainText("You have selected Ant-Man");
    const ss1 = await page.screenshot();
    testInfo.attach("SuperHero Screenshot", {
        body: ss1,
        contentType: 'image/png',
    })

    const languageDropdwon = await page.locator('[id="lang"]');
    const options = await page.locator('[id="lang"] option').all();
    for(let i=0; i<options.length; i++) {
        console.log(await options[i].textContent());
        if (i+1 === options.length) {
            await languageDropdwon.selectOption({index: i});
        }
    }
    console.log("*************************")
    const selectedOption = await languageDropdwon.inputValue();
    console.log(selectedOption);
    await expect(selectedOption).toEqual("sharp");
    const ss2 = await page.screenshot();
    testInfo.attach("Language Dropdown", {
        body: ss2,
        contentType: 'image/png',
    })

    //Select India using value & print the selected value
    const countryDropdown = await page.locator('[id="country"]');
    await countryDropdown.selectOption({value:"India"});
    console.log(await countryDropdown.inputValue());
    const selectedOpton = await countryDropdown.inputValue();
    await expect(selectedOpton).toContain("India");

    const ss3 = await page.screenshot();
    testInfo.attach("Final Screenshot", {
        body: ss3,
        contentType: 'image/png',
    })
})