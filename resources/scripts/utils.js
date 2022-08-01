/*
 * @Author: zhaojiongyang
 * @Date: 2021-06-08 11:53:52
 * @Last Modified by: zhaojiongyang
 * @Last Modified time: 2021-06-09 14:20:11
 */

exports.validateCommitMsg = (target, config = {}) => {
    // 校验 .cz-config.js 是否提供了提交类型
  
    if ((config && !config.types) || config.types.length === 0) {
      throw `未设置提交类型`;
    }
  
    if (
      (config && !config.typePrefix) ||
      !config.typeSuffix ||
      !config.subjectSeparator
    ) {
      throw `配置未提供类型前后缀或分隔符`;
    }
  
    if (/\s{2,}/.test(target)) {
      throw `提交格式不正确: 提交信息存在连续空格`;
    }
  
    let [type, subject] = target.split(
      `${config.typeSuffix}${config.subjectSeparator}`,
    );
  
    // 未按照 <type> subject 的格式或者提交类型 type 不正确
    if (!subject) {
      throw '提交格式不正确: <type> subject';
    }
  
    const typeList = config.types.map((item) => {
      return item.value;
    });
  
    if (typeList.indexOf(type.substring(1)) === -1) {
      throw `类型不正确: 请提供 ${typeList.join(', ')} 其中一种`;
    }
  
    subject = ` ${subject} `;
    const subjectRE = /([0-9]+)|([a-zA-Z])+/g;
    const leftMarkRE = /\s/;
    const rightMarkRE =
      /[\·\~\！\@\#\￥\%\……\&\*\（\）\——\-\+\=\【\】\{\}\、\|\；\‘\’\：\“\”\《\》\？\，\。\、\`\~\!\#\$\%\^\&\*\(\)\_\[\]{\}\\\|\;\'\'\:\"\"\,\.\/\<\>\?\s]+/;
  
    // 检查匹配项格式, 左边为空白字符，右边为空白字符串或标点符号
    const checkFormat = (words, target) => {
      let firstIndex = 0;
      words.forEach((word) => {
        firstIndex = target.indexOf(word, firstIndex);
        let prefix = target[firstIndex - 1];
        let suffix = target[firstIndex + word.length];
        firstIndex += word.length;
  
        if (!leftMarkRE.test(prefix)) {
          throw `请检查 ${word} 左边是否漏加了空格`;
        }
  
        if (!rightMarkRE.test(suffix)) {
          throw `请检查 ${word} 右边是否漏加了空格`;
        }
      });
      return false;
    };
  
    // 捕获匹配项
    const needCheck = subject.match(subjectRE);
  
    if (needCheck && needCheck.length > 0) {
      checkFormat(needCheck, subject);
    }
  
    return true;
  };