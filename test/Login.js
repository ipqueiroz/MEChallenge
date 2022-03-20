const {Builder, By, Key, util} = require("selenium-webdriver");
const assert = require ("assert");


// describe block
describe("Login test", function(){

    // it block  
    it("Login com sucesso", async function(){
    
        //abrir browser
    
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("http://automationpractice.com/index.php?controller=authentication&back=my-account");

        // adicionar valores no login

        await driver.findElement(By.id("email")).sendKeys("teste_isabelle@teste.com");
        await driver.findElement(By.id("passwd")).sendKeys("teste");
        
        // enviar valores
        
        await driver.findElement(By.id("SubmitLogin")).click();
        
        // asserção

        const msg = await driver.findElement(By.className("info-account")).getText().then(function(value){
            return value
        });
        
        assert.strictEqual(msg, "Welcome to your account. Here you can manage all of your personal information and orders.");

        // fechar browser

        await driver.quit();

    });

    it("Login em branco", async function(){
    
        //abrir browser
    
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("http://automationpractice.com/index.php?controller=authentication&back=my-account");

            
        // enviar login
        
        await driver.findElement(By.id("SubmitLogin")).click();
        
        // asserção

        const msg = await driver.findElement(By.className("alert alert-danger")).getText().then(function(value){
            return value
        });
        
        assert.strictEqual(msg, "There is 1 error\nAn email address required.");

        // fechar browser

        await driver.quit();

    });

    it("Login inválido", async function(){
    
        //abrir browser
    
        let driver = await new Builder().forBrowser("chrome").build();
        await driver.get("http://automationpractice.com/index.php?controller=authentication&back=my-account");

        // adicionar valores no login

        await driver.findElement(By.id("email")).sendKeys("teste_isabelle");
        await driver.findElement(By.id("passwd")).sendKeys("teste");
        
        // enviar valores
        
        await driver.findElement(By.id("SubmitLogin")).click();
        
        // asserção

        const msg = await driver.findElement(By.className("alert alert-danger")).getText().then(function(value){
            return value
        });
        
        assert.strictEqual(msg, "There is 1 error\nInvalid email address.");

        // fechar browser

        await driver.quit();

    });
});

