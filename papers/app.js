(function () {
  'use strict';

  var SUBJECTS = [
    ['math', '数学'],
    ['chinese', '语文'],
    ['english', '英语'],
    ['mechanical', '机械类'],
    ['politics', '思政']
  ];
  var SUB_NAME = { math: '数学', chinese: '语文', english: '英语', mechanical: '机械类', politics: '思政' };
  var current = (function () {
    try {
      var m = /[?&]subject=([a-z]+)/.exec(location.search);
      if (m && SUB_NAME[m[1]]) return m[1];
    } catch (e) { /* ignore */ }
    return 'math';
  })();
  var DATA = null;
  var TOPICS = {};

  function $(id) { return document.getElementById(id); }

  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    }
    if (text != null) n.textContent = text;
    return n;
  }

  function topicName(id) {
    if (!id) return '';
    return TOPICS[id] || '';
  }

  function renderTabs() {
    var box = $('paper-tabs');
    box.replaceChildren();
    SUBJECTS.forEach(function (s) {
      var b = el('button', { type: 'button', class: 'paper-tab', role: 'tab' }, s[1]);
      b.setAttribute('aria-selected', s[0] === current ? 'true' : 'false');
      b.addEventListener('click', function () {
        current = s[0];
        renderTabs();
        renderList();
      });
      box.append(b);
    });
  }

  function renderItem(item, paper) {
    var card = el('div', { class: 'q-card' });
    var top = el('div', { class: 'q-top' });
    top.append(el('span', null, item.label));
    if (item.year) {
      top.append(el('span', { class: 'q-year' }, String(item.year) + ' 年真题'));
    } else {
      top.append(el('span', { class: 'q-year sample' }, '官方示例题'));
    }
    if (item.answerSource === '本站自解') {
      top.append(el('span', { class: 'q-topic' }, '答案：本站自解'));
    }
    var tn = topicName(item.topicId);
    if (tn) top.append(el('span', { class: 'q-topic' }, '关联知识点：' + tn));
    card.append(top);
    card.append(el('p', { class: 'q-stem' }, item.stem));
    if (item.passage) {
      var d = el('details', { class: 'q-passage-wrap' });
      var s = el('summary', { class: 'q-toggle' }, '展开短文 / 对话原文');
      d.append(s, el('div', { class: 'q-passage' }, item.passage));
      card.append(d);
    }
    if (item.choices && item.choices.length) {
      var ch = el('div', { class: 'q-choices' });
      item.choices.forEach(function (c) {
        ch.append(el('span', null, c));
      });
      card.append(ch);
    }
    var acts = el('div', { class: 'q-actions' });
    var ansBox = el('div', { class: 'q-answer' });
    ansBox.append(el('strong', null, '答案：'), el('span', null, item.answer));
    if (item.solution) {
      ansBox.append(el('p', { style: 'margin:6px 0 0;color:#4a5a57;font-size:13.5px;' }, '解析：' + item.solution));
    }
    var btn = el('button', { type: 'button', class: 'q-toggle' }, '看答案与解析');
    btn.addEventListener('click', function () {
      var on = ansBox.classList.toggle('show');
      btn.textContent = on ? '收起答案' : '看答案与解析';
    });
    acts.append(btn);
    card.append(acts, ansBox);
    return card;
  }

  function renderList() {
    var box = $('paper-list');
    box.replaceChildren();
    var papers = (DATA.papers || []).filter(function (p) { return p.subject === current; });
    if (!papers.length) {
      var note = el('div', { class: 'empty-note' });
      note.append(el('p', { style: 'margin:0 0 6px;' }, current === 'politics'
        ? '思政为 2027 年新增的文化素质科目，此前没有可核验的历史真题原卷；诊断与图谱里的 140 道题是按公开解读的四个核心考点和中职思政基础模块自编。'
        : SUB_NAME[current] + '：本站暂未收录可核验的真题原卷。'));
      note.append(el('p', { style: 'margin:0;' }, DATA.missingNote || ''));
      box.append(note);
      return;
    }
    papers.forEach(function (p) {
      var sheet = el('section', { class: 'paper-sheet' });
      var head = el('div', { class: 'paper-head' });
      head.append(el('h2', null, p.title));
      head.append(el('span', { class: 'paper-badge' + (p.origin === '示例题' ? ' sample' : '') }, p.badge));
      sheet.append(head, el('p', { class: 'paper-meta' }, '年份口径：' + p.yearNote + '　|　来源：' + p.source));
      if (p.note) sheet.append(el('p', { class: 'paper-note' }, p.note));
      (p.items || []).forEach(function (item) { sheet.append(renderItem(item, p)); });
      box.append(sheet);
    });
  }

  function boot() {
    var lede = $('papers-lede');
    Promise.all([
      fetch('../data/papers.json').then(function (r) { return r.json(); }),
      fetch('../data/topics.json').then(function (r) { return r.json(); })
    ]).then(function (res) {
      DATA = res[0];
      (res[1] || []).forEach(function (t) { TOPICS[t.id] = t.name; });
      var total = (DATA.papers || []).reduce(function (n, p) { return n + (p.items || []).length; }, 0);
      lede.textContent = '这里放公开渠道能核验到原题的真题与官方示例题：共 ' + DATA.papers.length + ' 份卷 / ' + total + ' 题。'
        + '2020 年以后的完整原卷在学科网等平台只能拿到付费图片版，本站没有文字原卷，所以不编造“某某年真题”；每道题都标注了真实出处，官方未给答案的题会写明“本站自解”。';
      renderTabs();
      renderList();
    }).catch(function (e) {
      lede.textContent = '真题库读取失败：' + e.message;
    });
  }

  boot();
})();
