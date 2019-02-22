it('should return select of users', async () => {
    await myTestsHelper.cleanDb();
  
    // создаю юзера в БД. Мой вопрос про вот эту функцию :) 
    const user = await myTestsHelper.factories.createSomeUser();
  
    // вызываю тестируемый эндпоинт
    await request.post(`/users/$(user.id)/item`)
    .expect(200);
    
  })