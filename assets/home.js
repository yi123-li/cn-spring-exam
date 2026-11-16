/* 首页：统计和年级入口都从 data/*.json 计算，不写死数量。 */
(function () {
  'use strict';
  var raw = location.hash.replace(/^#/, '');
  try { raw = decodeURIComponent(raw); } catch (e) { /* 保持原样 */ }
  if (/^(?:cnm|cne|cnp|cnc|cns|cnd|cnh|cng|cnb|cnk|cnz)_[A-Za-z0-9]+$/.test(raw)) return;

  var CN = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  var subjectParam = new URLSearchParams(location.search).get('subject');
  var subject = subjectParam === 'mechanical' || subjectParam === 'english' || subjectParam === 'physics' || subjectParam === 'chinese' || subjectParam === 'science' || subjectParam === 'morality' || subjectParam === 'history' || subjectParam === 'geography' || subjectParam === 'biology' || subjectParam === 'chemistry' || subjectParam === 'politics' ? subjectParam : 'math';
  var PREFIX = { math: 'cnm_', mechanical: 'cnj_', english: 'cne_', physics: 'cnp_', chinese: 'cnc_', science: 'cns_', morality: 'cnd_', history: 'cnh_', geography: 'cng_', biology: 'cnb_', chemistry: 'cnk_', politics: 'cnz_' };
  var STD_PREFIX = { math: 'cms-', english: 'ces-', physics: 'cps-', chinese: 'ccs-', science: 'css-', morality: 'cds-', history: 'chs-', geography: 'cgs-', biology: 'cbs-', chemistry: 'cks-' };

  function withSubject(href) {
    if (subject === 'math' || !href || href.indexOf('subject=') >= 0 || href.indexOf('http') === 0) return href;
    return href + (href.indexOf('?') >= 0 ? '&' : '?') + 'subject=' + subject;
  }

  document.body.classList.toggle('subject-english', subject === 'english');
  document.body.classList.toggle('subject-physics', subject === 'physics');
  document.body.classList.toggle('subject-chinese', subject === 'chinese');
  document.body.classList.toggle('subject-science', subject === 'science');
  document.body.classList.toggle('subject-morality', subject === 'morality');
  document.body.classList.toggle('subject-history', subject === 'history');
  document.body.classList.toggle('subject-geography', subject === 'geography');
  document.body.classList.toggle('subject-biology', subject === 'biology');
  document.body.classList.toggle('subject-chemistry', subject === 'chemistry');
  document.body.classList.toggle('subject-politics', subject === 'politics');
  document.querySelectorAll('.subject-link').forEach(function (link) {
    var on = link.getAttribute('data-subject') === subject;
    link.classList.toggle('on', on);
    if (on) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
  document.querySelectorAll('.site-nav a:not(.subject-link), a.brand').forEach(function (link) {
    var href = link.getAttribute('href');
    var next = withSubject(href);
    if (next && next !== href) link.setAttribute('href', next);
  });
  if (subject === 'politics') {
    document.title = '思想政治 · 天津春考 2027 届';
    var qeye = document.querySelector('.eyebrow');
    if (qeye) qeye.textContent = '天津高职分类考试（面向中职毕业生）· 思想政治 · 2027 届 · 文化素质第四科';
    var qh1 = document.querySelector('.hero h1');
    if (qh1) qh1.textContent = '思政先补能判分的那几块';
    var qlede = document.querySelector('.lede');
    if (qlede) qlede.textContent = '春考思政 2027 年新增为文化素质第四科：100 分、90 分钟、25 题。题型按公开解读取单选 15 题×2 分＝30、双项选择 5 题×4 分＝20、简答 5 题×10 分＝50（两处公开解读分值不一致，此处取自洽版本，非市招办原文）。按价值引领、国情常识、职业道德、法治观念四个核心考点拆成 28 个知识点、140 道题，答错会沿先修往回追到根因。';
    var qprimary = document.querySelector('.hero-actions a.btn-primary');
    var qbrowse = document.querySelector('.hero-actions a.btn:not(.btn-primary)');
    if (qprimary) qprimary.setAttribute('href', 'diagnose/?subject=politics');
    if (qbrowse) qbrowse.setAttribute('href', 'explore/?subject=politics');
    var qbrand = document.querySelector('a.brand');
    if (qbrand && qbrand.textContent.indexOf('天津春考数学') >= 0) {
      qbrand.innerHTML = qbrand.innerHTML.replace('天津春考数学', '天津春考思政');
    }
    var qstep = Array.prototype.find.call(document.querySelectorAll('p'), function (n) {
      return n.textContent.indexOf('四个模块展开') >= 0;
    });
    if (qstep) qstep.textContent = '按价值引领、国情常识、职业道德、法治观念四个板块展开，找到想检查的那一条：新时代主要矛盾、人民代表大会制度、职业道德规范、宪法与公民权利义务……搜关键词也行。';
    var qdemo = document.querySelector('.quiet-link a');
    if (qdemo) {
      qdemo.setAttribute('href', 'diagnose/?subject=politics&target=cnz_p001&demo=1');
      qdemo.textContent = '先看一遍演示：新时代我国社会主要矛盾';
    }
    var qkicker = document.querySelector('.brand-kicker');
    if (qkicker) qkicker.textContent = '2027 届 · 文化素质';
  } else if (subject === 'mechanical') {
    document.title = '机械类专业 · 天津春考 2027 届';
    var jeye = document.querySelector('.eyebrow');
    if (jeye) jeye.textContent = '天津高职分类考试（面向中职毕业生）· 机械类专业 · 2027 届 理论 + 技能';
    var jheading = document.querySelector('.hero h1');
    if (jheading) jheading.textContent = '机械类理论加技能，先补最该补的那一步';
    var jlede = document.querySelector('.lede');
    if (jlede) jlede.textContent = '按 2027 年机械类职业技能的分值结构组织知识点：理论基础 200 分、90 分钟（机械制图约 30%、机械基础约 55%、极限配合与测量约 15%），技能应用 200 分、笔试 30 分钟（车工、钳工任选其一，按等级赋分 A 等第 200 分 / B 等第 80 分）。作图投影、机构传动、公差判断、装刀对刀都拆成可诊断的小步，答错会沿先修往回追到根因。';
    var jprimary = document.querySelector('.hero-actions a.btn-primary');
    if (jprimary) jprimary.setAttribute('href', 'diagnose/?subject=mechanical');
    var jbrowse = document.querySelector('.hero-actions a.btn:not(.btn-primary)');
    if (jbrowse) jbrowse.setAttribute('href', 'explore/?subject=mechanical');
    var jbrand = document.querySelector('a.brand');
    if (jbrand && jbrand.textContent.indexOf('天津春考数学') >= 0) {
      jbrand.innerHTML = jbrand.innerHTML.replace('天津春考数学', '天津春考机械类');
    }
    var jstep = Array.prototype.find.call(document.querySelectorAll('p'), function (n) {
      return n.textContent.indexOf('四个模块展开') >= 0;
    });
    if (jstep) jstep.textContent = '按机械制图、机械基础、公差配合、技能应用四个板块展开，找到想检查的那一条：三视图、尺寸标注、齿轮传动、公差等级、攻丝底孔、切削用量……搜关键词也行。';
    var jdemo = document.querySelector('.quiet-link a');
    if (jdemo) {
      jdemo.setAttribute('href', 'diagnose/?subject=mechanical&target=cnj_003&demo=1');
      jdemo.textContent = '先看一遍演示：三视图的形成与投影规律';
    }
} else if (subject === 'english') {
    document.title = '英语 · 天津春考 2027 届';
    var eye = document.querySelector('.eyebrow');
    if (eye) eye.textContent = '天津高职分类考试（面向中职毕业生）· 英语 · 2027 届';
    var eh1 = document.querySelector('.hero h1');
    if (eh1) eh1.textContent = '英语先补能被考到的那部分';
    var elede = document.querySelector('.lede');
    if (elede) elede.textContent = '春考英语 2027 年为 100 分、60 分钟、42 题：词汇语法约 35%（完形 20 分 + 语法填空 15 分）、阅读约 45%（阅读 30 分 + 补全对话 15 分）、写作约 20%（阅读回答 20 分）。按这三块拆成 25 个知识点：冠词代词、时态语态、篇章理解、阅读回答。答错会沿先修往回追到根因。';
    var primary = document.querySelector('.hero-actions a.btn-primary');
    var browse = document.querySelector('.hero-actions a.btn:not(.btn-primary)');
    if (primary) primary.setAttribute('href', 'diagnose/?subject=english');
    if (browse) browse.setAttribute('href', 'explore/?subject=english');
    var demo = document.querySelector('.quiet-link a');
    if (demo) {
      demo.setAttribute('href', 'diagnose/?subject=english&target=cne_p001&demo=1');
      demo.textContent = '先看一遍演示：名词与冠词';
    }
    var ebrand = document.querySelector('a.brand');
    if (ebrand && ebrand.textContent.indexOf('天津春考数学') >= 0) {
      ebrand.innerHTML = ebrand.innerHTML.replace('天津春考数学', '天津春考英语');
    }
    var estep = Array.prototype.find.call(document.querySelectorAll('p'), function (n) {
      return n.textContent.indexOf('四个模块展开') >= 0;
    });
    if (estep) estep.textContent = '按词汇语法、英语阅读、英语写作三个模块展开，找到想检查的那一条：冠词代词、时态语态、主旨细节、应用文格式……搜关键词也行。';
    var ekicker = document.querySelector('.brand-kicker');
    if (ekicker) ekicker.textContent = '2027 届 · 文化素质';
  } else if (subject === 'physics') {
    document.title = '物理 · 中小学·高中知识图谱';
    var peye = document.querySelector('.eyebrow');
    if (peye) peye.textContent = '物理：初中八、九年级 · 高中必修与选择性必修';
    var pprimary = document.querySelector('.hero-actions a.btn-primary');
    var pbrowse = document.querySelector('.hero-actions a.btn:not(.btn-primary)');
    if (pprimary) pprimary.setAttribute('href', 'diagnose/?subject=physics');
    if (pbrowse) pbrowse.setAttribute('href', 'explore/?subject=physics');
    var pdemo = document.querySelector('.quiet-link a');
    if (pdemo) {
      pdemo.setAttribute('href', 'diagnose/?subject=physics&grade=' + encodeURIComponent('八上') + '&demo=1');
      pdemo.textContent = '先看一遍演示：八年级上册物理';
    }
  } else if (subject === 'chinese') {
    document.title = '语文 · 天津春考 2027 届';
    var zeye = document.querySelector('.eyebrow');
    if (zeye) zeye.textContent = '天津高职分类考试（面向中职毕业生）· 语文 · 2027 届';
    var zh1 = document.querySelector('.hero h1');
    if (zh1) zh1.textContent = '语文要补的，是能判分的那几步';
    var zlede = document.querySelector('.lede');
    if (zlede) zlede.textContent = '春考语文 2027 年为 100 分、120 分钟、19 题：基础约 18%（积累与运用 18 分）、阅读约 36%（古诗文 12 + 现代文 6 + 14 + 默写 4）、写作约 46%（应用文 6 + 作文 40）。按这三块拆成 25 个知识点：字音字形、词语句子、古诗文与文言文、应用文与作文。答错会沿先修往回追到根因，再给出补学顺序。';
    var zprimary = document.querySelector('.hero-actions a.btn-primary');
    var zbrowse = document.querySelector('.hero-actions a.btn:not(.btn-primary)');
    if (zprimary) zprimary.setAttribute('href', 'diagnose/?subject=chinese');
    if (zbrowse) zbrowse.setAttribute('href', 'explore/?subject=chinese');
    var zdemo = document.querySelector('.quiet-link a');
    if (zdemo) {
      zdemo.setAttribute('href', 'diagnose/?subject=chinese&target=cnc_p001&demo=1');
      zdemo.textContent = '先看一遍演示：多音字与形近字的读音';
    }
    var zbrand = document.querySelector('a.brand');
    if (zbrand && zbrand.textContent.indexOf('天津春考数学') >= 0) {
      zbrand.innerHTML = zbrand.innerHTML.replace('天津春考数学', '天津春考语文');
    }
    var zstep = Array.prototype.find.call(document.querySelectorAll('p'), function (n) {
      return n.textContent.indexOf('四个模块展开') >= 0;
    });
    if (zstep) zstep.textContent = '按语文基础、语文阅读、语文写作三个模块展开，找到想检查的那一条：字音字形、病句标点、文言虚词、应用文格式……搜关键词也行。';
    var zkicker = document.querySelector('.brand-kicker');
    if (zkicker) zkicker.textContent = '2027 届 · 文化素质';
  } else if (subject === 'science') {
    document.title = '小学科学 · 中小学·高中知识图谱';
    var seye = document.querySelector('.eyebrow');
    if (seye) seye.textContent = '科学：小学一至六年级 · 教科版';
    var sprimary = document.querySelector('.hero-actions a.btn-primary');
    var sbrowse = document.querySelector('.hero-actions a.btn:not(.btn-primary)');
    if (sprimary) sprimary.setAttribute('href', 'diagnose/?subject=science');
    if (sbrowse) sbrowse.setAttribute('href', 'explore/?subject=science');
    var sdemo = document.querySelector('.quiet-link a');
    if (sdemo) {
      sdemo.setAttribute('href', 'diagnose/?subject=science&grade=' + encodeURIComponent('一上') + '&demo=1');
      sdemo.textContent = '先看一遍演示：一年级上册科学';
    }
  } else if (subject === 'morality') {
    document.title = '小学道德与法治 · 中小学·高中知识图谱';
    var meye = document.querySelector('.eyebrow');
    if (meye) meye.textContent = '道德与法治：小学一至六年级 · 统编版';
    var mprimary = document.querySelector('.hero-actions a.btn-primary');
    var mbrowse = document.querySelector('.hero-actions a.btn:not(.btn-primary)');
    if (mprimary) mprimary.setAttribute('href', 'diagnose/?subject=morality');
    if (mbrowse) mbrowse.setAttribute('href', 'explore/?subject=morality');
    var mdemo = document.querySelector('.quiet-link a');
    if (mdemo) {
      mdemo.setAttribute('href', 'diagnose/?subject=morality&grade=' + encodeURIComponent('一上') + '&demo=1');
      mdemo.textContent = '先看一遍演示：一年级上册道德与法治';
    }
  } else if (subject === 'history') {
    document.title = '初中历史 · 中小学·高中知识图谱';
    var heye = document.querySelector('.eyebrow');
    if (heye) heye.textContent = '历史：初中七至九年级 · 统编版';
    var hprimary = document.querySelector('.hero-actions a.btn-primary');
    var hbrowse = document.querySelector('.hero-actions a.btn:not(.btn-primary)');
    if (hprimary) hprimary.setAttribute('href', 'diagnose/?subject=history');
    if (hbrowse) hbrowse.setAttribute('href', 'explore/?subject=history');
    var hdemo = document.querySelector('.quiet-link a');
    if (hdemo) {
      hdemo.setAttribute('href', 'diagnose/?subject=history&grade=' + encodeURIComponent('七上') + '&demo=1');
      hdemo.textContent = '先看一遍演示：七年级上册历史';
    }
  } else if (subject === 'geography') {
    document.title = '初中地理 · 中小学·高中知识图谱';
    var geye = document.querySelector('.eyebrow');
    if (geye) geye.textContent = '地理：初中七至八年级 · 人教版';
    var gprimary = document.querySelector('.hero-actions a.btn-primary');
    var gbrowse = document.querySelector('.hero-actions a.btn:not(.btn-primary)');
    if (gprimary) gprimary.setAttribute('href', 'diagnose/?subject=geography');
    if (gbrowse) gbrowse.setAttribute('href', 'explore/?subject=geography');
    var gdemo = document.querySelector('.quiet-link a');
    if (gdemo) {
      gdemo.setAttribute('href', 'diagnose/?subject=geography&grade=' + encodeURIComponent('七上') + '&demo=1');
      gdemo.textContent = '先看一遍演示：七年级上册地理';
    }
  } else if (subject === 'biology') {
    document.title = '初中生物 · 中小学·高中知识图谱';
    var beye = document.querySelector('.eyebrow');
    if (beye) beye.textContent = '生物：初中七至八年级 · 人教版';
    var bprimary = document.querySelector('.hero-actions a.btn-primary');
    var bbrowse = document.querySelector('.hero-actions a.btn:not(.btn-primary)');
    if (bprimary) bprimary.setAttribute('href', 'diagnose/?subject=biology');
    if (bbrowse) bbrowse.setAttribute('href', 'explore/?subject=biology');
    var bdemo = document.querySelector('.quiet-link a');
    if (bdemo) {
      bdemo.setAttribute('href', 'diagnose/?subject=biology&grade=' + encodeURIComponent('七上') + '&demo=1');
      bdemo.textContent = '先看一遍演示：七年级上册生物';
    }
  } else if (subject === 'chemistry') {
    document.title = '化学 · 中小学·高中知识图谱';
    var ceye = document.querySelector('.eyebrow');
    if (ceye) ceye.textContent = '化学：初中九年级 · 人教版';
    var cprimary = document.querySelector('.hero-actions a.btn-primary');
    var cbrowse = document.querySelector('.hero-actions a.btn:not(.btn-primary)');
    if (cprimary) cprimary.setAttribute('href', 'diagnose/?subject=chemistry');
    if (cbrowse) cbrowse.setAttribute('href', 'explore/?subject=chemistry');
    var cdemo = document.querySelector('.quiet-link a');
    if (cdemo) {
      cdemo.setAttribute('href', 'diagnose/?subject=chemistry&grade=' + encodeURIComponent('九上') + '&demo=1');
      cdemo.textContent = '先看一遍演示：九年级上册化学';
    }
  }

  function setText(id, value) {
    var node = document.getElementById(id);
    if (node) node.textContent = value;
  }

  function fail(message) {
    var box = document.getElementById('load-error');
    if (!box) return;
    box.hidden = false;
    box.textContent = message;
  }


  function renderBlindHome(allTopics) {
    var box = document.getElementById('blind-home');
    var list = document.getElementById('blind-home-list');
    var actions = document.getElementById('blind-home-actions');
    if (!box || !list || !actions || !window.CnmBlind) return;
    var nameOf = {};
    (allTopics || []).forEach(function (t) { nameOf[t.id] = t.name; });
    var rows = window.CnmBlind.list({ subject: subject, limit: 8 });
    if (!rows.length) {
      box.hidden = true;
      list.replaceChildren();
      actions.replaceChildren();
      return;
    }
    box.hidden = false;
    list.replaceChildren();
    rows.forEach(function (row) {
      var li = document.createElement('li');
      li.className = 'blind-home-item';
      var name = document.createElement('a');
      name.className = 'blind-home-name';
      name.href = window.CnmBlind.diagnoseHref([row.id], row.subject || subject);
      name.textContent = nameOf[row.id] || row.id;
      li.appendChild(name);
      var meta = document.createElement('span');
      meta.className = 'blind-home-meta';
      var bits = [row.status === 'weak' ? (row.root ? '根因' : '薄弱') : '不稳'];
      if (row.wrongs) bits.push('答错 ' + row.wrongs + ' 次');
      meta.textContent = bits.join(' · ');
      li.appendChild(meta);
      list.appendChild(li);
    });
    actions.replaceChildren();
    var cur = window.CnmChildren && window.CnmChildren.current && window.CnmChildren.current();
    var all = document.createElement('a');
    all.className = 'btn';
    all.href = window.CnmBlind.historyHref(cur && cur.id, 'children/');
    all.textContent = '查看全部盲区';
    actions.appendChild(all);
    var weakIds = rows.filter(function (r) { return r.status === 'weak'; }).slice(0, 5).map(function (r) { return r.id; });
    if (weakIds.length) {
      var re = document.createElement('a');
      re.className = 'btn btn-primary';
      re.href = window.CnmBlind.diagnoseHref(weakIds, subject);
      re.textContent = '再测本页薄弱点';
      actions.appendChild(re);
    }
  }

  Promise.all([
    fetch('data/topics.json'),
    fetch('data/dependencies.json'),
    fetch('data/questions.json'),
    fetch('data/cn-curriculum-standards.json')
  ]).then(function (responses) {
    responses.forEach(function (response, index) {
      if (!response.ok) throw new Error('HTTP ' + response.status);
    });
    return Promise.all(responses.map(function (response) { return response.json(); }));
  }).then(function (data) {
    var allTopics = data[0];
    var topics = data[0];
    var deps = data[1];
    var questions = data[2];
    var standards = data[3];
    if (!Array.isArray(topics) || !Array.isArray(deps) || !Array.isArray(questions)) {
      throw new Error('数据格式无法识别');
    }
    var items = standards && Array.isArray(standards.items) ? standards.items : [];
    function subjectOfId(id) {
      id = String(id || '');
      if (id.indexOf('cne_') === 0) return 'english';
      if (id.indexOf('cnp_') === 0) return 'physics';
      if (id.indexOf('cnc_') === 0) return 'chinese';
      if (id.indexOf('cns_') === 0) return 'science';
      if (id.indexOf('cnd_') === 0) return 'morality';
      if (id.indexOf('cnh_') === 0) return 'history';
      if (id.indexOf('cng_') === 0) return 'geography';
      if (id.indexOf('cnb_') === 0) return 'biology';
      if (id.indexOf('cnk_') === 0) return 'chemistry';
      if (id.indexOf('cnj_') === 0) return 'mechanical';
      if (id.indexOf('cnz_') === 0) return 'politics';
      return 'math';
    }
    function subjectOfStd(id) {
      id = String(id || '');
      if (id.indexOf('ces-') === 0) return 'english';
      if (id.indexOf('cps-') === 0) return 'physics';
      if (id.indexOf('ccs-') === 0) return 'chinese';
      if (id.indexOf('css-') === 0) return 'science';
      if (id.indexOf('cds-') === 0) return 'morality';
      if (id.indexOf('chs-') === 0) return 'history';
      if (id.indexOf('cgs-') === 0) return 'geography';
      if (id.indexOf('cbs-') === 0) return 'biology';
      if (id.indexOf('cks-') === 0) return 'chemistry';
      return 'math';
    }
    var wantEnglish = subject === 'english';
    var wantPhysics = subject === 'physics';
    var wantPrimary = subject === 'science' || subject === 'morality';
    var wantHistory = subject === 'history';
    var wantGeography = subject === 'geography';
    var wantBiology = subject === 'biology';
    var wantChemistry = subject === 'chemistry';
    topics = topics.filter(function (topic) { return (topic.subject || subjectOfId(topic.id)) === subject; });
    deps = deps.filter(function (edge) { return subjectOfId(edge.topicId) === subject; });
    questions = questions.filter(function (question) { return subjectOfId(question.topicId) === subject; });
    items = items.filter(function (item) { return subjectOfStd(item.id) === subject; });
    setText('n-topics', String(topics.length));
    setText('n-edges', String(deps.length));
    setText('n-questions', String(questions.length));
    setText('n-standards', String(items.length));

    var grades = document.getElementById('grades');
    if (!grades) return;
    grades.replaceChildren();
    grades.removeAttribute('aria-busy');
    function addCard(g, stageName, title, klass, splitText, href, gradeValue) {
      var gval = gradeValue == null ? g : gradeValue;
      var list = topics.filter(function (topic) { return topic.grade === gval; });
      var link = document.createElement('a');
      link.className = 'grade-card ' + klass;
      link.href = href;
      var stage = document.createElement('span');
      stage.className = 'grade-stage';
      stage.textContent = stageName;
      var name = document.createElement('strong');
      name.textContent = title;
      var count = document.createElement('span');
      count.className = 'grade-count';
      var qn = 0;
      list.forEach(function (t) {
        qn += questions.filter(function (q) { return q.topicId === t.id; }).length;
      });
      count.textContent = list.length + ' 个知识点 · ' + qn + ' 题';
      var split = document.createElement('span');
      split.className = 'grade-stage';
      split.textContent = splitText;
      link.append(stage, name, count, split);
      grades.append(link);
    }
    /* 春考数学：grade 1–4 表示代数、三角、几何、概率统计四个模块 */
    var MODNAME, MODPCT, STAGE, to;
    if (subject === 'politics') {
      MODNAME = ['', '价值引领', '国情常识', '职业道德', '法治观念'];
      MODPCT = ['', '核心考点', '核心考点', '核心考点', '核心考点'];
      STAGE = '春考思政';
      to = 4;
    } else if (subject === 'mechanical') {
      MODNAME = ['', '机械制图', '机械基础', '公差配合', '技能应用'];
      MODPCT = ['', '约 30%', '约 55%', '约 15%', '等级赋分 200/80'];
      STAGE = '机械类专业';
      to = 4;
    } else if (subject === 'chinese') {
      MODNAME = ['', '语文基础', '语文阅读', '语文写作'];
      MODPCT = ['', '约 18%', '约 36%', '约 46%'];
      STAGE = '春考语文';
      to = 3;
    } else if (subject === 'english') {
      MODNAME = ['', '词汇语法', '英语阅读', '英语写作'];
      MODPCT = ['', '约 35%', '约 45%', '约 20%'];
      STAGE = '春考英语';
      to = 3;
    } else {
      MODNAME = ['', '代数', '三角', '几何', '概率统计'];
      MODPCT = ['', '约 40%', '约 20%', '约 32%', '约 8%'];
      STAGE = '春考数学';
      to = 4;
    }
    var from = 1;
    var GRADEMAP = subject === 'english' ? [0, 3, 4, 5] : null;
    for (var g = from; g <= to; g++) {
      var gv = GRADEMAP ? GRADEMAP[g] : g;
      var list = topics.filter(function (topic) { return topic.grade === gv; });
      var up = list.filter(function (topic) { return topic.semester === '上'; }).length;
      var down = list.filter(function (topic) { return topic.semester === '下'; }).length;
      var whole = list.filter(function (topic) { return topic.semester === '全'; }).length;
      var splitText = MODPCT[g] || '';
      var href = subject !== 'math' ? 'explore/?subject=' + subject + '&grade=' + gv : 'explore/?grade=' + gv;
      addCard(g, STAGE, MODNAME[g] || ('模块' + g), 'is-primary', splitText, href, gv);
    }
    if (true) {
      /* 春考站只到四个模块，不加高中必修 / 选择性必修卡片 */
    } else if (wantHistory) {
      /* 初中历史只到九年级 */
    } else if (wantGeography) {
      /* 初中地理只到八年级 */
    } else if (wantBiology) {
      /* 初中生物只到八年级，九年级没有生物课 */
    } else if (wantChemistry) {
      /* 初中化学只开九年级，没有小学、七八年级和高中卡片 */
    } else if (wantPhysics) {
      addCard(10, '高中物理', '必修一', 'is-senior', '必修第一册', 'explore/?subject=physics&grade=10');
      addCard(11, '高中物理', '必修二', 'is-senior', '必修第二册', 'explore/?subject=physics&grade=11');
      addCard(12, '高中物理', '必修三', 'is-senior', '必修第三册', 'explore/?subject=physics&grade=12');
      addCard(13, '高中物理', '选必一', 'is-senior', '选择性必修第一册', 'explore/?subject=physics&grade=13');
      addCard(14, '高中物理', '选必二', 'is-senior', '选择性必修第二册', 'explore/?subject=physics&grade=14');
      addCard(15, '高中物理', '选必三', 'is-senior', '选择性必修第三册', 'explore/?subject=physics&grade=15');
    } else if (wantEnglish) {
      addCard(10, '高中', '必修一', 'is-senior', '必修第一册', 'explore/?subject=english&grade=10');
      addCard(11, '高中', '必修二', 'is-senior', '必修第二册', 'explore/?subject=english&grade=11');
      addCard(12, '高中', '必修三', 'is-senior', '必修第三册', 'explore/?subject=english&grade=12');
      addCard(13, '高中', '选必一', 'is-senior', '选择性必修第一册', 'explore/?subject=english&grade=13');
      addCard(14, '高中', '选必二', 'is-senior', '选择性必修第二册', 'explore/?subject=english&grade=14');
      addCard(15, '高中', '选必三', 'is-senior', '选择性必修第三册', 'explore/?subject=english&grade=15');
      addCard(16, '高中', '选必四', 'is-senior', '选择性必修第四册', 'explore/?subject=english&grade=16');
    } else {
      addCard(10, '高中', '高一', 'is-senior', '必修第一册', 'explore/?grade=10');
      addCard(11, '高中', '高二', 'is-senior', '必修第二册', 'explore/?grade=11');
      addCard(12, '高中', '选必一', 'is-senior', '选择性必修第一册', 'explore/?grade=12');
      addCard(13, '高中', '选必二', 'is-senior', '选择性必修第二册', 'explore/?grade=13');
      addCard(14, '高中', '选必三', 'is-senior', '选择性必修第三册', 'explore/?grade=14');
    }
    renderBlindHome(allTopics);
  }).catch(function (error) {
    fail('数据没有加载成功（' + (error && error.message ? error.message : error) + '）。请在项目根目录运行 python3 -m http.server 8001，再用浏览器打开，不要直接双击 html 文件。');
  });
})();
