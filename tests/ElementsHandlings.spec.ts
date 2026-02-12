import { expect, test, Page, TestInfo } from "@playwright/test";

test("Handling Elements related scenario in PW_TS", async ({page}, testInfo) => {
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="Elements"]')).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="Elements"]/parent::header/following-sibling::div//p').textContent();
    await expect(input_content).toContain(" Play with element and smash them ");
    await page.locator('a[href="/elements"]').click();
    await expect(page.locator('h1[class^="title"]').first()).toBeVisible();
    await attachScreenshot(page, testInfo, "Landing Page Screenshot");

    //Actual GitHub validation
    await page.locator('[name="username"]').fill("rama");
    await page.locator('[id="search"]').click();
    const user_Name = await page.locator('[class="media-content"] > p[class^="title"]').textContent();
    console.log(user_Name);
    await expect(user_Name).toEqual('rama');

    const repos = await page.locator('//*[@class="heading"]/following-sibling::p[contains(@class,"title")]').nth(0).textContent();
    const gists = await page.locator('//*[@class="heading"]/following-sibling::p[contains(@class,"title")]').nth(1).textContent();
    const folllowers = await page.locator('//*[@class="heading"]/following-sibling::p[contains(@class,"title")]').nth(2).textContent();
    console.log(repos);
    console.log(gists);
    console.log(folllowers);

    const links = await page.locator('a[class="has-text-link"]');
    const prev_btn = await page.getByRole('button', {name: " Previous "});
    const next_btn = await page.getByRole('button', {name: " Next "});

    const all_links = [];
    const titles = [];
    const datas: Record<string, string> = {};

    for (let i=0; i<parseInt(repos); i++) {
        if (i === 10) {
            await expect(next_btn).toBeEnabled();
            await next_btn.click();
            await expect(prev_btn).toBeEnabled();
            await expect(next_btn).not.toBeEnabled();
        }
    
        if (i >= 10) {
            let j = i-10;
            const urls = await links.nth(j).getAttribute('href');
            await all_links.push(urls);
            const titletext = await links.nth(j).textContent();
            titles.push(titletext);
            if (titletext && urls){
                datas[titletext] = urls;
            }
            
        } else {
            const urls = await links.nth(i).getAttribute('href');
            await all_links.push(urls);
            const titletext = await links.nth(i).textContent();
            titles.push(titletext);
            if (titletext && urls){
                datas[titletext] = urls;
            }
        }
        
    }

    console.log(all_links);
    console.log(all_links.length);
    console.log(titles);
    console.log(titles.length);
    console.log(datas);

    await attachScreenshot(page, testInfo, "Final Screenshot");
})

async function attachScreenshot(page: Page, testInfo: TestInfo, SS_name: string = "Screenshot") {
    const ss = await page.screenshot();
    testInfo.attach(SS_name, {
        body: ss,
        contentType: 'image/png'
    })
}