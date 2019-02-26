//Базовый тест на проверку соединения с базой
it('should return select of users', async () => {
    await myTestsHelper.cleanDb();
  
    const user = await myTestsHelper.factories.createSomeUser();
  
    // вызываю тестируемый эндпоинт
    // await request.get(`/users/$(user.id)/item`)
    await request.get(`/poll`)
    .expect(200);
    
  });