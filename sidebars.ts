import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  documentationSidebar: [
    'overview',
    'components',
    'data',
    {
      type: 'category',
      label: 'Hardware/3D Design',
      items: ['hardware/housing', 'hardware/pcb', 'hardware/turbidity'],
    },
    {
      type: 'category',
      label: 'Software',
      items: [
        'software/orchestration',
        // {
        //   type: 'category',
        //   label: 'Main Pico',
        //   items: [
        //     'software/main/main'
        //   ],
        // },
        // {
        //   type: 'category',
        //   label: 'Wake Pico',
        //   items: [
        //     'software/main'
        //   ],
        // },
        // {
        //   type: 'category',
        //   label: 'Data Server',
        //   items: [
        //     'software/main'
        //   ],
        // },
        // {
        //   type: 'category',
        //   label: 'Connect App',
        //   items: [
        //     'software/main'
        //   ],
        // },
        'software/troubleshooting'
      ],
    },
    'deployment'
  ],
};

export default sidebars;
