describe("Тест", function() {

  before(function() { alert("Начало тестов"); });
  after(function() { alert("Конец тестов"); });


  it('тест 1', function() { alert('1'); });
  it('тест 2', function() { alert('2'); });

});


describe("pow", function() {

  it("возводит в n-ю степень", function() {
    assert.equal(pow(2, 3), 6);
    assert.equal(pow(3, 4), 12);
  });
  
  });