const json = '{"value":1}';

try {
  // statement;
  const parsed = JSON.parse(json);

  if (!json.name) {
    throw new SyntaxError('입력에 name이 없습니다');
  }

  console.log(parsed.name);
} catch (err) {
  console.log(err.name);
  console.log(err.message);
  console.log(err.stack);
}
