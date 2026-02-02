'use client';
export default function (name: string, value: string) {
  document.cookie = name + '=' + value;
}
