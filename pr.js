/**
 * gh 를 사용해 PR 요청시 템플릿이 적용되지 않는 문제를 해결하기 위한 확장 스크립트
 * 깃허브 웹페이지가 아닌 CLI 에서 PR 요청을 작성하기 위한 스크립트 입니다.
 * 
 * 호출 방법 (Node.js 가 설치되어 있어야 합니다)
 * 
 * 도움말
 * node pr --help
 * 
 * node pr [flags]
 * 
 * node pr --title:"오타 수정" --overview:"오타 수정" --change:"README.md"
 * 
 * --title
 * PR 제목을 설정합니다.
 * 
 * --overview
 * 개요 내용을 작성합니다
 * 
 * --detail
 * 작업 내용을 작성합니다.
 * 
 * --change
 * 변경사항을 작성합니다
 * 
 * --how
 * 사용방법을 작성합니다.
 * 
 * --other
 * 기타를 작성합니다.
 * 
 * author : kyutorials
 * create date : 2023-11-28
 * 
 */
const { execSync } = require('child_process');
const { writeFileSync, rmSync } = require('fs');
const { join, resolve } = require('path');

try {
    const argv = process.argv.slice(2);

    if (['--help', '-help', 'help', '/help', '/?', '?'].some(pattern => argv.includes(pattern))) {
        console.log([
            'node pr 도움말',
            '',
            '--title',
            'PR 제목을 설정합니다.',
            '',
            '--overview',
            '개요 내용을 작성합니다',
            '',
            '--detail',
            '작업 내용을 작성합니다.',
            '',
            '--change',
            '변경사항을 작성합니다',
            '',
            '--how',
            '사용방법을 작성합니다.',
            '',
            '--other',
            '기타를 작성합니다.'
        ].join('\n'));
        return;
    }

    const args = argv.filter(item => item.startsWith('--') && item.includes(':')).reduce((result, current) => {
        let array = current.substring(2).split(':');
        const key = array[0].trim();
        const value = array.slice(1).join(':').trim().replaceAll('\\n', '\n');

        if (value.trim().length != 0) {
            result[key.trim()] = value.trim();
        }
        return result;
    }, {});

    let body = {
        overview: '',
        detail: '',
        change: '',
        how: '',
        other: ''
    };

    if (args['title'] == null) {
        throw new Error('--title:"제목" 은 필수로 입력해주세요.');
    }

    Object.keys(body).forEach(param => {
        const v = args[param];
        if (v !== undefined && v.trim().length > 0) {
            body[param] = v;
        }
    });

    let bodyStr = '';

    bodyStr = [
        '## 🎲 개요',
        body.overview,
        '',
        '## 📚 작업내용',
        body.detail,
        '',
        '## 🔀 변경사항',
        body.change,
        '',
        '## 🤔 사용방법',
        body.how,
        '',
        '## 🎸 기타',
        body.other,
        ''
    ].join('\n');

    const file = 'gh-temp-' + require('crypto').randomBytes(16).toString('hex');
    console.log(file);

    let err = null;

    writeFileSync(join(resolve(), file), bodyStr, { encoding: 'utf-8' });

    try {
        const cmd = 'gh pr create ' + ['--title', JSON.stringify(args['title']), '--body-file', file].join(' ');
        console.log(cmd);

        const result = execSync(cmd, { encoding: 'utf-8' });
        console.log(result);
    } catch (reason) {
        err = reason;
    }

    rmSync(join(resolve(), file), { force: true, recursive: true });

    if (err) throw err;

} catch (reason) {
    console.log('Error', reason.message);
}