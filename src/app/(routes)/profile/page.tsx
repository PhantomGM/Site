import { t } from '../../../lib/i18n'
import { getSession } from '../../../lib/auth'
import prisma from '../../../lib/db'

export default async function ProfilePage() {
  const session = await getSession()
  const user = session?.user?.id
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { posts: true }
      })
    : null

  return (
    <div>
      <h1>{t('profile_title', 'off')}</h1>
      {user && (
        <div>
          {user.avatarUrl && (
            <img src={user.avatarUrl} alt={user.displayName} />
          )}
          {user.bio && <p>{user.bio}</p>}
          <ul>
            {user.posts.map(post => (
              <li key={post.id}>{post.body}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
