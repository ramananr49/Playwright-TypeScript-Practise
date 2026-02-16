import { expect, test, TestInfo , Page} from "@playwright/test";

test("Hanlding File upload download scenario in PW_TS", async ({page}, testInfo) => {
    
    await page.goto('https://letcode.in/');
    await page.locator('a[id="testing"][href="/test"]').click();
    await expect(page.locator('//p[contains(@class, "card-header-title") and normalize-space()="File"]')).toBeVisible();
    const input_content = await page.locator('//*[normalize-space()="File"]/parent::header/following-sibling::div//p').textContent();
    await expect(input_content).toContain(" All your data is secured! ");
    await page.locator('a[href="/file"]').click();
    await expect(page.locator('h1[class^="title"]').first()).toBeVisible();
    await attachScreenshot(page, testInfo, "Landing Page Screenshot");
    await page.waitForLoadState('domcontentloaded');

    //File Upload Scenario Validation
    const FileUploadEle = await page.locator('input[type="file"]');
    const filepath = "resources/uploadFile.pdf";
    const fileText = await page.locator('[class="field"] p');
    await FileUploadEle.setInputFiles(filepath);
    await expect(fileText).toContainText("Selected File: uploadFile.pdf");

    //File Download Scenario Validation
    const DownloadExcelBtn = await page.locator('a[download="sample.xlsx"]');
    const DownloadPdfBtn = await page.locator('a[download="sample.pdf"]');
    const DownloadTextBtn = await page.locator('a[download="sample.txt"]');

    //verify Excel Download
    const excelDownloadPromise = page.waitForEvent("download");
    await DownloadExcelBtn.click();
    const excelDownload = await excelDownloadPromise;
    await expect(excelDownload.suggestedFilename()).toBe("sample.xlsx");
    const path = await excelDownload.path();
    await expect(path).not.toBeNull();
    await excelDownload.saveAs("download/sample.xlsx");

    //verify PDF Download
    const pdfDownloadPromise = page.waitForEvent("download");
    await DownloadPdfBtn.click();
    const pdfDownload = await pdfDownloadPromise;
    await expect(pdfDownload.suggestedFilename()).toBe("sample.pdf");
    const pdfpath = await pdfDownload.path();
    await expect(pdfpath).not.toBeNull();
    await pdfDownload.saveAs("download/sample.pdf");

    //verify Text Download
    const textDownloadPromise = page.waitForEvent("download");
    await DownloadTextBtn.click();
    const textdownload = await textDownloadPromise;
    await expect(textdownload.suggestedFilename()).toBe("sample.txt");
    const textpath = textdownload.path();
    await expect(textpath).not.toBeNull();
    await textdownload.saveAs("download/sample.txt")
    
    await attachScreenshot(page, testInfo, "Verification Completed Screenshot");
})


async function attachScreenshot(page: Page, testInfo: TestInfo, name: string="Screenshot") {
    
    const ss = await page.screenshot()
    testInfo.attach(name, {
        body: ss,
        contentType: 'image/png'
    })
}