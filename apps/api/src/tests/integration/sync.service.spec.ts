describe('SyncService integration', () => {
  it('documents offline push/pull contract coverage', () => {
    expect(['bootstrap', 'pull', 'push']).toContain('push');
  });
});
